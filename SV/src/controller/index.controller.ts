import db from "../database";
import db_img_user from "../database_img";
import useragent = require("express-useragent");
import jwtt, { Secret, JwtPayload } from "jsonwebtoken";
import { OkPacket, RowDataPacket } from "mysql2";
import { Response, Request, request } from "express";
import bcrypt = require("bcrypt");
var fs = require('fs');
import * as path from "path";
import send_email_controllers from "../sendEmail/send_email.controller";
import send_email_controller_forget_passwords from "../sendEmail/send_email_forget_pass";
import * as EmailValidator from "email-validator";
import uid_generator from "../tools/id_generator";
import create_database_by_id from "../tools/create_database_by_id";
import createFolders from "../tools/create_folder"
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
var user = "login";
var secret = "fe1a1915a379f3be5394b64d14794932";
var urladress = "http://localhost:4200/verify/email-adress/";
var urladress_forget = "http://localhost:4200/forget-password/password/";
var baseURL = "http://localhost:3501";
let jwtSecretKey = "hellokeys";


class indexController {
  // Get all users
  public async list(req: Request, res: Response): Promise<void> {

    let sql = `SELECT * FROM ${user}`;
    await db.query(sql, (err, result) => {
      if (err) {
        res.json(err);
      }
      res.json(result);
    });
  }

  // Get one user
  public async getOne(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    let sql = `SELECT * FROM ${user} WHERE id = ?`;
    await db.query(sql, [id], (err, result) => {
      const row = (<RowDataPacket>result)[0];
      if (Object.entries(<RowDataPacket>result).length === 0) {
        res.status(404).json({ message: "Not found" });
      }
      if (result) {
        res.json(row);
        
      }
    });
  }
  
  public async getOneEmail(req: Request, res: Response): Promise<void> {
    const email = req.body.email;
    const password = req.body.password;
    const id = req.params.id;
    let sql = `SELECT * FROM ${user} WHERE email = ?`;
    await db.query(sql, [email], (err, result) => {
      const row = (<RowDataPacket>result)[0];
      if (Object.entries(<RowDataPacket>result).length === 0) {
        res.status(300).json({ message: "Not found" });
      } else {
        const pass = bcrypt.compareSync(password, row.password); // true or false
        if (pass == true) {
          var token = jwtt.sign({ row }, jwtSecretKey, { expiresIn: "2h" });
          res.json(token);
          console.log("succes", token);
        } else {
          res.json("error");
        }
      }
    });
  }

  // create username token
  public async createUser(req: Request, res: Response): Promise<void> {
    var firstName = req.body.Fname;
    var lastname = req.body.Lname;
    var email = req.body.email;
    var phonenumber = req.body.phonenr;
    var password = req.body.password;
    var user_agent = req.useragent?.source;
    var browser = req.useragent?.browser;
    var versionBrowser = req.useragent?.version;
    var os = req.useragent?.os;
    var isEmailVerify = "no";
    var uid = `user_id_${uid_generator(16)}`;
    var imgProfil = `${baseURL}/images/default_profile/avatar-person.svg`;

    const passwordtoken = bcrypt.hashSync(password, salt);
    if (
      firstName == "" ||
      lastname == "" ||
      email == "" ||
      phonenumber == "" ||
      password == ""
    ) {
      res.status(300).json("All data required!");
    } else if (EmailValidator.validate(email) == true) {
      let sql = `INSERT INTO ${user}(firstName, lastname, email, phonenumber, password,user_agent,browser,os, versionBrowser,isEmailVerify,imageUrl,profileID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
      await db.query(
        sql,
        [
          firstName,
          lastname,
          email,
          phonenumber,
          passwordtoken,
          user_agent,
          browser,
          os,
          versionBrowser,
          isEmailVerify,
          imgProfil,
          uid,
        ],
        (err, result) => {
          if (err) {
            res.json(err);
          }
          if (result) {
            var token = {
              firstName: req.body.Fname,
              lastname: req.body.Lname,
              email: req.body.email,
              phonenumber: req.body.phonenr,
              password: req.body.password,
              user_agent: req.useragent?.source,
              browser: req.useragent?.browser,
              versionBrowser: req.useragent?.version,
              os: req.useragent?.os,
              isEmailVerify: "no",
              uid_acc: uid,
              profileImg: imgProfil,
            };
            var tokens = jwtt.sign({ token }, jwtSecretKey, {
              expiresIn: "2h",
            });
            var x = send_email_controllers.sendEmail(
              email,
              firstName,
              lastname,
              urladress,
              tokens
            );
            try {
              createFolders(`./public/Profile_Image_Client/${uid}`)
            } catch (error) {
               console.log(error) 
            }
            try {
              create_database_by_id(req, res, `${uid}`)
            } catch (error) {
               console.log(error) 
            }
            res.status(200).json("Succes");
          }
        }
      );
    } else {
      res.status(300).json("Please enter a valid email adress or phone number");
    }
  }

  public async confirmEmailAdress(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const decoded: any = jwtt.verify(id, jwtSecretKey);
      let sql = `SELECT * FROM ${user} WHERE email = ?`;
      await db.query(sql, [decoded.token.email], async (err, result) => {
        const row = (<RowDataPacket>result)[0];
        if (Object.entries(<RowDataPacket>result).length === 0) {
          res.json("error");
        }
        if (result) {
          console.log(row.isEmailVerify);
          if (row.isEmailVerify != "yes") {
            let sql = `UPDATE ${user} set isEmailVerify = 'yes'  WHERE email  = ?`;
            await db.query(sql, [decoded.token.email], (err, result) => {
              res.json({ error: 200, message: "Succes" });
            });
          } else {
            res.json({ error: 200, message: "Alerday verified!" });
          }
        }
      });
    } catch (err) {
      res.json({ error: 404, message: "Token Expired!" });
    }
  }

  public async forgetPassword(req: Request, res: Response): Promise<void> {
    const email = req.body.email;
    let sql = `SELECT * FROM ${user} WHERE email = ?`;
    await db.query(sql, [email], (err, result) => {
      const row = (<RowDataPacket>result)[0];
      if (Object.entries(<RowDataPacket>result).length === 0) {
        res.status(300).json("Email not found in database, plese retry");
      } else {
        let lastname = row.lastname;
        let firstName = row.firstName;
        var token = jwtt.sign({ row }, jwtSecretKey, { expiresIn: "2h" });
        var sendEmail = send_email_controller_forget_passwords.sendEmail(
          email,
          firstName,
          lastname,
          urladress_forget,
          token
        );
        res
          .status(200)
          .json("Selnd link to your email adress for reset password");
      }
    });
  }

  // update user
  public async update_password(req: Request, res: Response): Promise<any> {
    const email = req.body.email;
    const passwordtoken = bcrypt.hashSync(req.body.password, salt);
    let sql = `UPDATE ${user} set password=?  WHERE email = ?`;
    await db.query(sql, [passwordtoken, email], (err, result) => {
      if (err) {
        res.status(400).json("Error, please contact support!");
      }
      res.status(200).json("Password hass been update!");
    });
  }

  // delete user
  public async delete(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    let sql = `DELETE  FROM  ${user} WHERE id = ?`;
    await db.query(sql, [id], (err, result) => {
      res.json({ Message: "Delete" + " - " + id });
    });
  }

  public async deleteCalendarInfo(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    let sql = `DELETE  FROM  calendar WHERE id = ?`;
    await db.query(sql, [id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ Message: "Delete" + " - " + id });
      } 
    });
  }

  public async postCalendar(req: Request, res: Response): Promise<void> {
    const titlex = req.body.title;
    const descrierex = req.body.descriere;
    const deLa = req.body.from; 
    const panaLa = req.body.to;
    const timex = req.body.time;
    const idpostx = req.body.idpost; 
    const ora = req.body.oras;
    try {
      let sql = `INSERT INTO calendar (title,descriere,deLa,panaLa,time,idpost) VALUES (?,?,?,?,?,?)`;
      if (
        titlex == null ||
        descrierex == null ||   
        deLa == null ||
        panaLa == null
      ) {
        res.status(300).json({ message: "Error, All data required" });
      } else {
        await db.query(
          sql,
          [titlex, descrierex, deLa, panaLa, timex, idpostx],
          (err, result) => {
            if (err) {
              console.log(err)
              res.status(300).json({ message: "Error" });
            }
            res.status(200).json({ message: "succes" });
          }
        );
      }
    } catch (error) {
      res.status(400).json({ message: "Server Error" });
    }
  }

  public async dataCalendar(req: Request, res: Response): Promise<void> {
    let sql = `SELECT * FROM calendar`;
    await db.query(sql, (err, result) => {
      if (err) {
        res.json(err);
      }
      res.json(result);
    });
  }
}

const indexControllers = new indexController();
export default indexControllers;
