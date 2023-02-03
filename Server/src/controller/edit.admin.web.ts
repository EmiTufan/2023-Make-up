import { Request, request, Response } from "express";
import db from '../db.info'


class editAdminWeb {
  public async editTitle(req: Request, res: Response): Promise<void> {
      const {lname, fname, id} = req.body
      let sql = `UPDATE titlu SET lname=?,fname=? WHERE id = ?`
      db.query(sql, [lname, fname, id], (err:any, result:any)=>{
        if (err) {
          console.log(err)
        }else{
          res.status(200).json({message:'ok'})
        }
      })

  }
  public async getCurentTitle(req: Request, res: Response): Promise<void> {
    let sql = `Select * from titlu`
    db.query(sql, (err:any, result:any)=>{
      if (err) {
        console.log(err)
      }else{
        res.send(result)
      }
    })
}

  // letter

  public async addletter(req: Request, res: Response): Promise<void> {
    const {letter} = req.body
    let sql = `INSERT INTO cuvinte_descriere (letter) VALUES (?)`
    db.query(sql, [letter], (err:any, result:any)=>{
      if (err) {
        console.log(err)
      }else{
        res.status(200).json({message:'ok'})
      }
    })

}

public async getLetter(req: Request, res: Response): Promise<void> {
  let sql = `Select * from cuvinte_descriere`
  db.query(sql, (err:any, result:any)=>{
    if (err) {
      console.log(err)
    }else{
      res.send(result)
    }
  })
}

public async deleteLetter(req: Request, res: Response): Promise<void> {
  const id = req.params.id
  let sql = `DELETE FROM cuvinte_descriere WHERE id = ?`
  db.query(sql, [id],(err:any, result:any)=>{
    if (err) {
      console.log(err)
    }else{
      res.status(200).json({message:'ok'})
    }
  })
}







}
const editAdminWebsite = new editAdminWeb();
export default editAdminWebsite;
