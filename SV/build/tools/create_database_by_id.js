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
const database_img_1 = __importDefault(require("../database_img"));
class create_database_by_id {
    database(req, res, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let createTodos = `create table if not exists ${user}(
                id INT AUTO_INCREMENT PRIMARY KEY,
                idpost varchar(255)not null,
                name varchar(255)not null,
                email varchar(255)not null,
                phonenr varchar(255)not null,
                tipmachiaj varchar(255)not null,
                descriere varchar(255)not null,
                ora varchar(20)not null,
                pret varchar(20)not null,
                oraEnd varchar(20)not null,
                data date not null
            )`;
            yield database_img_1.default.query(createTodos, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
            });
        });
    }
}
const create_database = new create_database_by_id();
exports.default = create_database.database;
