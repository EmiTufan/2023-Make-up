"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const database_img_1 = __importDefault(require("../database_img"));
class indexControllerCalendar {
    // Get all users
    listDateOnCalendar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var myora = '17:00';
            var myora2 = '09:25';
            let sql = `SELECT * FROM calendarClient WHERE ora LIKE '${myora}' and oraEnd LIKE '${myora2}'`;
            yield database_1.default.query(sql, (err, result) => {
                if (err) {
                    res.json(err);
                }
                res.json(result);
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
        });
    }
    PostDataInCalendar_Client(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.body.uid;
            const { idpost, name, email, phonenr, tipmachiaj, descriere, data, pret, ora, oraEnd } = req.body;
            let sqlq = `SELECT * FROM calendar WHERE deLa <= '${data}' AND '${data}' <= panaLa`;
            var results = [];
            yield database_1.default.query(sqlq, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.json(err);
                }
                if (result.length == 1) {
                    res.json({ message: "Ocupat", key: 'data' });
                }
                else {
                    console.log('liber');
                    let sql = `SELECT * FROM calendarClient WHERE data = '${data}' AND ora LIKE '${ora}' and oraEnd LIKE '${oraEnd}'`;
                    yield database_1.default.query(sql, (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            res.json(err);
                        }
                        if (result.length != 0) {
                            res.json({ message: "Ocupat", key: 'ora' });
                        }
                        else {
                            let sql = `INSERT INTO calendarClient (idpost, name, email, phonenr, tipmachiaj, descriere, data, pret, ora, oraEnd) VALUES (?,?,?,?,?,?,?,?,?,?)`;
                            yield database_1.default.query(sql, [idpost, name, email, phonenr, tipmachiaj, descriere, data, pret, ora, oraEnd], (err, result) => __awaiter(this, void 0, void 0, function* () {
                                if (err) {
                                    res.json(err);
                                }
                                let sql = `INSERT INTO ${uid} (idpost, name, email, phonenr, tipmachiaj, descriere, data, pret, ora,oraEnd) VALUES (?,?,?,?,?,?,?,?,?,?)`;
                                yield database_img_1.default.query(sql, [idpost, name, email, phonenr, tipmachiaj, descriere, data, pret, ora, oraEnd], (err, result) => {
                                    if (err) {
                                        res.json(err);
                                    }
                                    res.json({ status: 200, message: 'Succes' });
                                });
                            }));
                        }
                    }));
                }
            }));
        });
    }
    getCalendarData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `SELECT * FROM calendarClient`;
            yield database_1.default.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(result);
                }
            });
        });
    }
    SumToal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = " SELECT SUM(pret) AS 'Total' FROM calendarClient";
            yield database_1.default.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(result);
                }
            });
        });
    }
    GetByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqParams = req.query.id;
            var sql = `SELECT * FROM calendarClient WHERE name LIKE '%${reqParams}%'`;
            yield database_1.default.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(result);
                }
            });
        });
    }
    GetHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqParams = req.params.id;
            var sql = `SELECT * FROM ${reqParams}`;
            yield database_img_1.default.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(result);
                }
            });
        });
    }
}
const IndexControllerCalendar = new indexControllerCalendar();
exports.default = IndexControllerCalendar;
