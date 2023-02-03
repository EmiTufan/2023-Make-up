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
const db_info_1 = __importDefault(require("../db.info"));
class editAdminWeb {
    editTitle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lname, fname, id } = req.body;
            let sql = `UPDATE titlu SET lname=?,fname=? WHERE id = ?`;
            db_info_1.default.query(sql, [lname, fname, id], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json({ message: 'ok' });
                }
            });
        });
    }
    getCurentTitle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `Select * from titlu`;
            db_info_1.default.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(result);
                }
            });
        });
    }
    // letter
    addletter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { letter } = req.body;
            let sql = `INSERT INTO cuvinte_descriere (letter) VALUES (?)`;
            db_info_1.default.query(sql, [letter], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json({ message: 'ok' });
                }
            });
        });
    }
    getLetter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `Select * from cuvinte_descriere`;
            db_info_1.default.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(result);
                }
            });
        });
    }
    deleteLetter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let sql = `DELETE FROM cuvinte_descriere WHERE id = ?`;
            db_info_1.default.query(sql, [id], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json({ message: 'ok' });
                }
            });
        });
    }
}
const editAdminWebsite = new editAdminWeb();
exports.default = editAdminWebsite;
