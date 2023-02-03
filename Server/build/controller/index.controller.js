"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = require("bcrypt");
var fs = require('fs');
const send_email_controller_1 = __importDefault(require("../sendEmail/send_email.controller"));
const send_email_forget_pass_1 = __importDefault(require("../sendEmail/send_email_forget_pass"));
const EmailValidator = __importStar(require("email-validator"));
const id_generator_1 = __importDefault(require("../tools/id_generator"));
const create_database_by_id_1 = __importDefault(require("../tools/create_database_by_id"));
const create_folder_1 = __importDefault(require("../tools/create_folder"));
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
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `SELECT * FROM ${user}`;
            yield database_1.default.query(sql, (err, result) => {
                if (err) {
                    res.json(err);
                }
                res.json(result);
            });
        });
    }
    // Get one user
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let sql = `SELECT * FROM ${user} WHERE id = ?`;
            yield database_1.default.query(sql, [id], (err, result) => {
                const row = result[0];
                if (Object.entries(result).length === 0) {
                    res.status(404).json({ message: "Not found" });
                }
                if (result) {
                    res.json(row);
                }
            });
        });
    }
    getOneEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const password = req.body.password;
            const id = req.params.id;
            let sql = `SELECT * FROM ${user} WHERE email = ?`;
            yield database_1.default.query(sql, [email], (err, result) => {
                const row = result[0];
                if (Object.entries(result).length === 0) {
                    res.status(300).json({ message: "Not found" });
                }
                else {
                    const pass = bcrypt.compareSync(password, row.password); // true or false
                    if (pass == true) {
                        var token = jsonwebtoken_1.default.sign({ row }, jwtSecretKey, { expiresIn: "2h" });
                        res.json(token);
                        console.log("succes", token);
                    }
                    else {
                        res.json("error");
                    }
                }
            });
        });
    }
    // create username token
    createUser(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            var firstName = req.body.Fname;
            var lastname = req.body.Lname;
            var email = req.body.email;
            var phonenumber = req.body.phonenr;
            var password = req.body.password;
            var user_agent = (_a = req.useragent) === null || _a === void 0 ? void 0 : _a.source;
            var browser = (_b = req.useragent) === null || _b === void 0 ? void 0 : _b.browser;
            var versionBrowser = (_c = req.useragent) === null || _c === void 0 ? void 0 : _c.version;
            var os = (_d = req.useragent) === null || _d === void 0 ? void 0 : _d.os;
            var isEmailVerify = "no";
            var uid = `user_id_${(0, id_generator_1.default)(16)}`;
            var imgProfil = `${baseURL}/images/default_profile/avatar-person.svg`;
            const passwordtoken = bcrypt.hashSync(password, salt);
            if (firstName == "" ||
                lastname == "" ||
                email == "" ||
                phonenumber == "" ||
                password == "") {
                res.status(300).json("All data required!");
            }
            else if (EmailValidator.validate(email) == true) {
                let sql = `INSERT INTO ${user}(firstName, lastname, email, phonenumber, password,user_agent,browser,os, versionBrowser,isEmailVerify,imageUrl,profileID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
                yield database_1.default.query(sql, [
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
                ], (err, result) => {
                    var _a, _b, _c, _d;
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
                            user_agent: (_a = req.useragent) === null || _a === void 0 ? void 0 : _a.source,
                            browser: (_b = req.useragent) === null || _b === void 0 ? void 0 : _b.browser,
                            versionBrowser: (_c = req.useragent) === null || _c === void 0 ? void 0 : _c.version,
                            os: (_d = req.useragent) === null || _d === void 0 ? void 0 : _d.os,
                            isEmailVerify: "no",
                            uid_acc: uid,
                            profileImg: imgProfil,
                        };
                        var tokens = jsonwebtoken_1.default.sign({ token }, jwtSecretKey, {
                            expiresIn: "2h",
                        });
                        var x = send_email_controller_1.default.sendEmail(email, firstName, lastname, urladress, tokens);
                        try {
                            (0, create_folder_1.default)(`./public/Profile_Image_Client/${uid}`);
                        }
                        catch (error) {
                            console.log(error);
                        }
                        try {
                            (0, create_database_by_id_1.default)(req, res, `${uid}`);
                        }
                        catch (error) {
                            console.log(error);
                        }
                        res.status(200).json("Succes");
                    }
                });
            }
            else {
                res.status(300).json("Please enter a valid email adress or phone number");
            }
        });
    }
    confirmEmailAdress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const decoded = jsonwebtoken_1.default.verify(id, jwtSecretKey);
                let sql = `SELECT * FROM ${user} WHERE email = ?`;
                yield database_1.default.query(sql, [decoded.token.email], (err, result) => __awaiter(this, void 0, void 0, function* () {
                    const row = result[0];
                    if (Object.entries(result).length === 0) {
                        res.json("error");
                    }
                    if (result) {
                        console.log(row.isEmailVerify);
                        if (row.isEmailVerify != "yes") {
                            let sql = `UPDATE ${user} set isEmailVerify = 'yes'  WHERE email  = ?`;
                            yield database_1.default.query(sql, [decoded.token.email], (err, result) => {
                                res.json({ error: 200, message: "Succes" });
                            });
                        }
                        else {
                            res.json({ error: 200, message: "Alerday verified!" });
                        }
                    }
                }));
            }
            catch (err) {
                res.json({ error: 404, message: "Token Expired!" });
            }
        });
    }
    forgetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            let sql = `SELECT * FROM ${user} WHERE email = ?`;
            yield database_1.default.query(sql, [email], (err, result) => {
                const row = result[0];
                if (Object.entries(result).length === 0) {
                    res.status(300).json("Email not found in database, plese retry");
                }
                else {
                    let lastname = row.lastname;
                    let firstName = row.firstName;
                    var token = jsonwebtoken_1.default.sign({ row }, jwtSecretKey, { expiresIn: "2h" });
                    var sendEmail = send_email_forget_pass_1.default.sendEmail(email, firstName, lastname, urladress_forget, token);
                    res
                        .status(200)
                        .json("Selnd link to your email adress for reset password");
                }
            });
        });
    }
    // update user
    update_password(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const passwordtoken = bcrypt.hashSync(req.body.password, salt);
            let sql = `UPDATE ${user} set password=?  WHERE email = ?`;
            yield database_1.default.query(sql, [passwordtoken, email], (err, result) => {
                if (err) {
                    res.status(400).json("Error, please contact support!");
                }
                res.status(200).json("Password hass been update!");
            });
        });
    }
    // delete user
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let sql = `DELETE  FROM  ${user} WHERE id = ?`;
            yield database_1.default.query(sql, [id], (err, result) => {
                res.json({ Message: "Delete" + " - " + id });
            });
        });
    }
    deleteCalendarInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let sql = `DELETE  FROM  calendar WHERE id = ?`;
            yield database_1.default.query(sql, [id], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ Message: "Delete" + " - " + id });
                }
            });
        });
    }
    postCalendar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const titlex = req.body.title;
            const descrierex = req.body.descriere;
            const deLa = req.body.from;
            const panaLa = req.body.to;
            const timex = req.body.time;
            const idpostx = req.body.idpost;
            const ora = req.body.oras;
            try {
                let sql = `INSERT INTO calendar (title,descriere,deLa,panaLa,time,idpost) VALUES (?,?,?,?,?,?)`;
                if (titlex == null ||
                    descrierex == null ||
                    deLa == null ||
                    panaLa == null) {
                    res.status(300).json({ message: "Error, All data required" });
                }
                else {
                    yield database_1.default.query(sql, [titlex, descrierex, deLa, panaLa, timex, idpostx], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(300).json({ message: "Error" });
                        }
                        res.status(200).json({ message: "succes" });
                    });
                }
            }
            catch (error) {
                res.status(400).json({ message: "Server Error" });
            }
        });
    }
    dataCalendar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `SELECT * FROM calendar`;
            yield database_1.default.query(sql, (err, result) => {
                if (err) {
                    res.json(err);
                }
                res.json(result);
            });
        });
    }
}
const indexControllers = new indexController();
exports.default = indexControllers;
