import db from "../database";
import db_img_user from "../database_img";
import { Response, Request, request } from "express";
import checkTOkens from "../checkHeaderRequest/check";


class indexControllerCalendar {
  // Get all users
  public async listDateOnCalendar(req: Request, res: Response): Promise<void> {
    var myora = '17:00'
    var myora2 = '09:25'
    let sql = `SELECT * FROM calendarClient WHERE ora LIKE '${myora}' and oraEnd LIKE '${myora2}'`;

    await db.query(sql, (err, result) => {
      if (err) {
        res.json(err);
      }
      res.json(result)
    });
    // // let sql = `SELECT * FROM calendarClient WHERE ora BETWEEN '15:00' AND '17:00'`;
    // // let sql = `SELECT * FROM calendarClient WHERE  ora > '10:00' OR ora > '12:00'`;
    // let sql = `SELECT * FROM calendarClient WHERE data = '2022-05-04' AND ora LIKE '17:00'`;

    // await db.query(sql, (err, result) => {
    //   if (err) {
    //     res.json(err);
    //   }
    //  res.send(result)
    // //   result.forEach((element:any) => {

    // //   var oramea = 13
    // // //  console.log( parseInt(element.ora) - 2)
    // //       if (oramea >=parseInt(element.ora) && oramea <= parseInt(element.oraEnd)) {
    // //           console.log('ocupat')
    // //       }
    // //       else if (oramea <= parseInt(element.ora) - 2) {
    // //         console.log(parseInt(element.ora) - 2)

    // //       }else{
    // //         console.log('ocupat')
    // //       }

    // //   });

    // });
  }

  public async PostDataInCalendar_Client(req: Request, res: Response): Promise<void> {
    const uid = req.body.uid
    const { idpost, name, email, phonenr, tipmachiaj, descriere, data, pret, ora, oraEnd } = req.body
    let sqlq = `SELECT * FROM calendar WHERE deLa <= '${data}' AND '${data}' <= panaLa`;
    var results: any[] = []
    await db.query(sqlq, async (err, result) => {
      if (err) {
        res.json(err);
      }
      if (result.length == 1) {
        res.json({ message: "Ocupat", key: 'data' });
      } else {
        console.log('liber')
        let sql = `SELECT * FROM calendarClient WHERE data = '${data}' AND ora LIKE '${ora}' and oraEnd LIKE '${oraEnd}'`;
        await db.query(sql, async (err, result) => {
          if (err) {
            res.json(err);
          }
          if (result.length != 0) {
            res.json({ message: "Ocupat", key: 'ora' });
          } else {

            let sql = `INSERT INTO calendarClient (idpost, name, email, phonenr, tipmachiaj, descriere, data, pret, ora, oraEnd) VALUES (?,?,?,?,?,?,?,?,?,?)`
            await db.query(sql, [idpost, name, email, phonenr, tipmachiaj, descriere, data, pret, ora, oraEnd], async (err, result) => {
              if (err) {
                res.json(err);
              }
              let sql = `INSERT INTO ${uid} (idpost, name, email, phonenr, tipmachiaj, descriere, data, pret, ora,oraEnd) VALUES (?,?,?,?,?,?,?,?,?,?)`
              await db_img_user.query(sql, [idpost, name, email, phonenr, tipmachiaj, descriere, data, pret, ora, oraEnd], (err, result) => {
                if (err) {
                  res.json(err);
                }
                res.json({ status: 200, message: 'Succes' });

              });
            });
          }
        });
      }
    });
  }

  public async getCalendarData(req: Request, res: Response):Promise<void> {
    let sql = `SELECT * FROM calendarClient`;
    await db.query(sql, (err, result)=>{
      if (err) {
        console.log(err)
      }else{
        res.send(result)
      }
    })
  }

  public async SumToal(req: Request, res: Response):Promise<void> {
    var sql = " SELECT SUM(pret) AS 'Total' FROM calendarClient";
    await db.query(sql, (err, result)=>{
      if (err) {
        console.log(err)
      }else{
        res.send(result)
      }
    })
  }

  
  public async GetByName(req: Request, res: Response):Promise<void> {
    let reqParams = req.query.id
    var sql = `SELECT * FROM calendarClient WHERE name LIKE '%${reqParams}%'`;
    await db.query(sql, (err, result)=>{
      if (err) {
        console.log(err)
      }else{
        res.send(result)
      }
    })
  }
  public async GetHistory(req: Request, res: Response):Promise<void> {
    let reqParams = req.params.id
    var sql = `SELECT * FROM ${reqParams}`;
    await db_img_user.query(sql, (err, result)=>{
      if (err) {
        console.log(err)
      }else{
        res.send(result)
      }
    })
  }

}


const IndexControllerCalendar = new indexControllerCalendar();
export default IndexControllerCalendar;
