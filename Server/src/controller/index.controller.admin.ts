import { Request, request, Response } from "express";
import { RowDataPacket } from "mysql2";
import db_login_admin from "../database-login-admin";
const bcrypt = require('bcrypt');
const saltRounds = 10;
let jwtSecretKey = "hellokeys";
import jwtt, { Secret, JwtPayload } from "jsonwebtoken";


class indexControllerAdmin {
  // Get all users
  public async getAllAdminUser(req: Request, res: Response): Promise<void> {
    let sql = ` SELECT * From login_admin`
    db_login_admin.query(sql, (error, result) => {
      if (error) {
        res.send(400).json({ message: `Error => ${error}` })
      } else {
        if ((<RowDataPacket>result).length != 0) {
          const row = (<RowDataPacket>result);
          res.status(200).json({ result: row })

        } else {
          res.status(200).json({ message: `No data found` })
        }
      }
    })
  }
  public async createAdmin(req: Request, res: Response): Promise<void> {
    const { nume, email, password } = req.body
    const passwordtoken = bcrypt.hashSync(password, saltRounds);

    const role = 'Admin'
    let sql = ` INSERT INTO login_admin (nume, email, password, role) VALUES (?,?,?,?)`
    db_login_admin.query(sql, [nume, email, passwordtoken, role], (error, result) => {
      if (error) {
        res.send(400).json({message: `Error => ${error}`})
      } else {
        res.status(200).json({ message: 'Succes'})
      }
    })
  }
  public getAdminAccount(req: Request, res: Response) {
    const { email, password } = req.body
    const sql = `SELECT * FROM login_admin WHERE  email = ?`
    db_login_admin.query(sql, [email], (error, result) => {
      if (error) {
        res.send(400).json({ message: `Error => ${error}` })
      } else {
        if ((<RowDataPacket>result).length != 0) {
          const row = (<RowDataPacket>result);
          bcrypt.compare(password, row[0].password, function (err: any, result: any) {
            if (err) {
              console.log(err)
            } else {
              if (result == true) {
                var token = jwtt.sign({ row }, jwtSecretKey, { expiresIn: "2h" });
                res.status(200).json({ message: 'Succes' , token: token})
              } else {
                res.status(200).send({ message: 'Password not working' })
              }
            }
          });
        } else {
          res.status(300).json({ message: 'No email found' })
        }
      }
    })

  }


}
const IndexControllerAdminLogin = new indexControllerAdmin();
export default IndexControllerAdminLogin;
