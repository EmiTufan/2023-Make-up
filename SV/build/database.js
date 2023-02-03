"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const keys_database_1 = __importDefault(require("./keys.database"));
const db = mysql_1.default.createPool(keys_database_1.default.database);
db.getConnection((err, con) => {
    if (err) {
        console.log({
            status: "failed",
            message: `MySQL error. ${err}`
        });
    }
    else {
        if (con) {
            con.release();
            console.log('\x1b[32m%s\x1b[0m', {
                status: "success",
                message: "MySQL connected. "
            });
        }
    }
});
exports.default = db;
// let sql = "SELECT * FROM users WHERE id = 2 ";
//   db.query(sql, (err, result) => {
//     try {
//         console.log(result)
//     } catch (error) {
//         console.log(error)
//     }
// })
// create table
// ALTER TABLE `login` CHANGE `id` `id` INT NOT NULL AUTO_INCREMENT, CHANGE `firstName` `firstName` VARCHAR(255) NOT NULL, CHANGE `lastname` `lastname` VARCHAR(255) NOT NULL, CHANGE `email` `email` VARCHAR(255) NOT NULL, CHANGE `phonenumber` `phonenumber` VARCHAR(255) NOT NULL, CHANGE `password` `password` VARCHAR(255) NOT NULL, CHANGE `user_agent` `user_agent` VARCHAR(255) NOT NULL, CHANGE `browser` `browser` VARCHAR(255) NOT NULL, CHANGE `os` `os` VARCHAR(255) NOT NULL, CHANGE `versionBrowser` `versionBrowser` VARCHAR(255) NOT NULL;
