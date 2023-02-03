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
const express_1 = require("express");
const multer = require("multer");
var fs = require("fs");
const fss = require('fs-extra');
const promises_1 = __importDefault(require("fs/promises"));
const path = __importStar(require("path"));
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
const profileClientImage = multer({ storage: uplaodImageprofilClient }).single('files');
class imageController {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    listImage(req, res) {
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
    postimg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.file;
            if (!file) {
                const error = new Error("No File");
                res.send(error);
            }
            res.json("succes");
        });
    }
    postprofileimage(reg, rez) {
        return __awaiter(this, void 0, void 0, function* () {
            profileUpload(reg, rez, (err) => __awaiter(this, void 0, void 0, function* () {
                const files = reg.files;
                let sql = `SELECT * FROM profileAdminImage WHERE idpost = ?`;
                yield database_1.default.query(sql, [reg.body.id], (err, result) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(result);
                        if (result.length != 0) {
                            const row = result[0].profileimage;
                            fs.unlink(path.join(__dirname, "../../public/imageAdminProfile/") + row, function (err, f) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log(f);
                                }
                            });
                            const URLS = `${url}/imageAdminProfile/${files[0].filename}`;
                            let sql = `UPDATE profileAdminImage set profileimage= ? ,idpost=?,urlLink=? WHERE  idpost = ?`;
                            yield database_1.default.query(sql, [files[0].filename, reg.body.id, URLS, reg.body.id], (err, res) => {
                                if (err) {
                                    rez.json('Error');
                                }
                                else {
                                    rez.json('succes');
                                }
                            });
                        }
                    }
                }));
            }));
        });
    }
    getProfileImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `SELECT * FROM profileAdminImage`;
            yield database_1.default.query(sql, (err, result) => {
                if (err) {
                    res.json(err);
                }
                res.json(result);
            });
        });
    }
    multipleImg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            multerUpload(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                const files = req.files;
                const fileInfo = [];
                if (err) {
                    console.log("Error");
                }
                else {
                    files.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                        fileInfo.push(element.filename);
                        const URL = `${url}/${element.filename}`;
                        let sql = `INSERT INTO image  (image, url, idPost) VALUES (?,?,?)`;
                        yield database_1.default.query(sql, [element.filename, URL, req.body.text], (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log("Succes");
                            }
                        });
                    }));
                    res.status(200).json({ message: "All data saved" });
                }
            }));
        });
    }
    deleteimagebyId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let sql = `SELECT * FROM image WHERE id = ?`;
            yield database_1.default.query(sql, [id], (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(err);
                }
                else {
                    if (result.length != 0) {
                        const row = result[0].image;
                        fs.unlink(path.join(__dirname, "../../public/") + row, function (err, f) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log(f);
                            }
                        });
                        let sql = `DELETE FROM image WHERE  id = ?`;
                        yield database_1.default.query(sql, [id], (err, result) => {
                            if (err) {
                                res.json("Error, no data deleted");
                            }
                            res.json("Succes");
                        });
                    }
                    else {
                        console.log("Error delete");
                    }
                }
            }));
        });
    }
    postProfileClientImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            profileClientImage(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                var userId = req.body.userId;
                var filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
                console.log(filename);
                const src = `public/Profile_Image_Client/img/${filename}`;
                const dest = `public/Profile_Image_Client/${userId}/${filename}`;
                const linkUrl = `${url}/Profile_Image_Client/${userId}/${filename}`;
                var folder = `public/Profile_Image_Client/${userId}`;
                const emptyFolder = (folder) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const files = yield promises_1.default.readdir(folder);
                        for (const file of files) {
                            yield promises_1.default.unlink(path.resolve(folder, file));
                        }
                    }
                    catch (err) {
                        console.log(err);
                    }
                });
                try {
                    yield emptyFolder(folder);
                    yield fs.renameSync(src, dest);
                }
                catch (err) {
                    console.log(err);
                }
                let sql = `UPDATE login set imageUrl= ? WHERE  profileID = ?
      `;
                yield database_1.default.query(sql, [linkUrl, userId], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // if ((<RowDataPacket>result).length != 0) {
                        //   const row = (<RowDataPacket>result)[0].imageUrl;
                        //   console.log(row)
                        // }
                    }
                });
                res.status(200).json({ msg: 'succes' });
            }));
        });
    }
    profileClientGet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var userId = req.body.userId;
            let sql = `SELECT imageUrl FROM login WHERE profileID = ?`;
            yield database_1.default.query(sql, [userId], (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(err);
                }
                else {
                    if (result.length > 0) {
                        const row = result[0];
                        res.status(200).json(row.imageUrl);
                    }
                    else {
                        res.status(200).json({ error: "not found" });
                    }
                }
            }));
        });
    }
}
const imageControllers = new imageController();
exports.default = imageControllers;
