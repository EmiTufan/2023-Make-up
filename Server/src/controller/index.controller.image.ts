import db from "../database";
import { Request, Response } from "express";
import { Router } from "express";
import multer = require("multer");
var fs = require("fs");
const fss = require('fs-extra')
import fsPromises from 'fs/promises'

import * as path from "path";
import { RowDataPacket } from "mysql2";
var user = "image";
var url = "http://localhost:3501/images";

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "public");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${Date.now()}${file.originalname}`);
  },
});



const uplaodImageprofilClient = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, `public/Profile_Image_Client/img`);
  },
  filename: (req, file, callBack) => {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    callBack(null, `${Date.now()}.${extension}`);
  },
});


const uplaodImageprofil = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "public/imageAdminProfile");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${Date.now()}${file.originalname}`);
  },
});

const multerUpload = multer({ storage: storage }).array("files");
const profileUpload = multer({ storage: uplaodImageprofil }).array("files");
const profileClientImage = multer({ storage: uplaodImageprofilClient}).single('files');


class imageController {
  public router: Router = Router();

  public async listImage(req: Request, res: Response): Promise<void> {
    let sql = `SELECT * FROM ${user}`;
    await db.query(sql, (err, result) => {
      if (err) {
        res.json(err); 
      }
      res.json(result);
    });
  }

  public async postimg(req: Request, res: Response) {
    const file = req.file;
    if (!file) {
      const error = new Error("No File");
      res.send(error);
    }
    res.json("succes");
  }

  public async postprofileimage(reg: Request, rez: Response) {
    profileUpload(reg, rez, async (err) => {
      const files: any = reg.files;
      let sql = `SELECT * FROM profileAdminImage WHERE idpost = ?`;
      await db.query(sql, [reg.body.id], async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          if ((<RowDataPacket>result).length != 0) {
            const row = (<RowDataPacket>result)[0].profileimage;
            fs.unlink(
              path.join(__dirname, "../../public/imageAdminProfile/") + row,
              function (err: any, f: any) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(f);
                }
              }
            );
            const URLS = `${url}/imageAdminProfile/${files[0].filename}`
            let sql = `UPDATE profileAdminImage set profileimage= ? ,idpost=?,urlLink=? WHERE  idpost = ?`;
            await db.query(sql, [files[0].filename, reg.body.id, URLS , reg.body.id], (err, res)=>{
              if (err) {
                rez.json('Error')
              }
              else{
                rez.json('succes')
              }
            })
          }
        }
      });
    });
  }

  public async getProfileImage(req: Request, res: Response) {
    let sql = `SELECT * FROM profileAdminImage`;
    await db.query(sql, (err, result) => {
      if (err) {
        res.json(err);
      }
      res.json(result);
    });
  }

  public async multipleImg(req: Request, res: Response) {
    multerUpload(req, res, async (err) => {
      const files: any = req.files;
      const fileInfo: any[] = [];
      if (err) {
        console.log("Error");
      } else {
        files.forEach(async (element: any) => {
          fileInfo.push(element.filename);
          const URL = `${url}/${element.filename}`;
          let sql = `INSERT INTO image  (image, url, idPost) VALUES (?,?,?)`;
          await db.query(
            sql,
            [element.filename, URL, req.body.text],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Succes");
              }
            }
          );
        });
        res.status(200).json({ message: "All data saved" });
      }
    });
  }

  public async deleteimagebyId(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    let sql = `SELECT * FROM image WHERE id = ?`;
    await db.query(sql, [id], async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if ((<RowDataPacket>result).length != 0) {
          const row = (<RowDataPacket>result)[0].image;
          fs.unlink(
            path.join(__dirname, "../../public/") + row,
            function (err: any, f: any) {
              if (err) {
                console.log(err);
              } else {
                console.log(f);
              }
            }
          );
          let sql = `DELETE FROM image WHERE  id = ?`;
          await db.query(sql, [id], (err, result) => {
            if (err) {
              res.json("Error, no data deleted");
            }
            res.json("Succes");
          });
        } else {
          console.log("Error delete");
        }
      }
    });
  }

  public async postProfileClientImage(req:Request, res:Response){
    profileClientImage(req, res, async( err)=>{
      var userId = req.body.userId
      var filename = req.file?.filename;
      console.log(filename)
      const src = `public/Profile_Image_Client/img/${filename}`
      const dest = `public/Profile_Image_Client/${userId}/${filename}`
      const linkUrl = `${url}/Profile_Image_Client/${userId}/${filename}`
      var folder = `public/Profile_Image_Client/${userId}`
      const emptyFolder = async (folder: any) => {
        try {
            const files = await fsPromises.readdir(folder);
            for (const file of files) {
                await fsPromises.unlink(path.resolve(folder, file));
            }
        } catch (err){
            console.log(err);
        }
    }
      try {
      await emptyFolder(folder);
      await fs.renameSync(src, dest);
      } catch (err) {
        console.log(err);
      }
      let sql = `UPDATE login set imageUrl= ? WHERE  profileID = ?
      `  
      await db.query(sql, [linkUrl, userId], (err, result)=>{
        if(err){
          console.log(err)
        }else{
          // if ((<RowDataPacket>result).length != 0) {
          //   const row = (<RowDataPacket>result)[0].imageUrl;
          //   console.log(row)
          // }
        }
      })

      res.status(200).json({msg:'succes'})
    })
  }
  public async profileClientGet(req: Request, res: Response){
      var userId = req.body.userId
      let sql = `SELECT imageUrl FROM login WHERE profileID = ?`;
      await db.query(sql,[userId], async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result.length > 0 ) {
            const row = (<RowDataPacket>result)[0]
            res.status(200).json(row.imageUrl)
          }else{
            res.status(200).json({error: "not found"})
          }
        }
        })

      }

}




const imageControllers = new imageController();
export default imageControllers;
