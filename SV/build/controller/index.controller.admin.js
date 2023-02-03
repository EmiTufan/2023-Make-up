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
const database_login_admin_1 = __importDefault(require("../database-login-admin"));
const bcrypt = require('bcrypt');
const saltRounds = 10;
let jwtSecretKey = "hellokeys";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class indexControllerAdmin {
    // Get all users
    getAllAdminUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = ` SELECT * From login_admin`;
            database_login_admin_1.default.query(sql, (error, result) => {
                if (error) {
                    res.send(400).json({ message: `Error => ${error}` });
                }
                else {
                    if (result.length != 0) {
                        const row = result;
                        res.status(200).json({ result: row });
                    }
                    else {
                        res.status(200).json({ message: `No data found` });
                    }
                }
            });
        });
    }
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nume, email, password } = req.body;
            const passwordtoken = bcrypt.hashSync(password, saltRounds);
            const role = 'Admin';
            let sql = ` INSERT INTO login_admin (nume, email, password, role) VALUES (?,?,?,?)`;
            database_login_admin_1.default.query(sql, [nume, email, passwordtoken, role], (error, result) => {
                if (error) {
                    res.send(400).json({ message: `Error => ${error}` });
                }
                else {
                    res.status(200).json({ message: 'Succes' });
                }
            });
        });
    }
    getAdminAccount(req, res) {
        const { email, password } = req.body;
        const sql = `SELECT * FROM login_admin WHERE  email = ?`;
        database_login_admin_1.default.query(sql, [email], (error, result) => {
            if (error) {
                res.send(400).json({ message: `Error => ${error}` });
            }
            else {
                if (result.length != 0) {
                    const row = result;
                    bcrypt.compare(password, row[0].password, function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            if (result == true) {
                                var token = jsonwebtoken_1.default.sign({ row }, jwtSecretKey, { expiresIn: "2h" });
                                res.status(200).json({ message: 'Succes', token: token });
                            }
                            else {
                                res.status(200).send({ message: 'Password not working' });
                            }
                        }
                    });
                }
                else {
                    res.status(300).json({ message: 'No email found' });
                }
            }
        });
    }
}
const IndexControllerAdminLogin = new indexControllerAdmin();
exports.default = IndexControllerAdminLogin;
