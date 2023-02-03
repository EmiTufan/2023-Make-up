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
const jwt_simple_1 = __importDefault(require("jwt-simple"));
var secret = 'fe1a1915a379f3be5394b64d14794932';
class gamesController {
    // Get all users 
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "SELECT * FROM users";
            yield database_1.default.query(sql, (err, result) => {
                res.json(result);
            });
        });
    }
    // Get one user
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let sql = "SELECT * FROM users  WHERE id = ?";
            yield database_1.default.query(sql, [id], (err, result) => {
                const row = result[0];
                let x = row.password;
                var token = jwt_simple_1.default.decode(x, secret);
                if (Object.entries(result).length === 0) {
                    res.status(404).json({ message: "Not found" });
                }
                if (result) {
                    res.json(row);
                }
            });
        });
    }
    // create user
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var username = req.body.username;
            var password = req.body.password;
            var token = jwt_simple_1.default.encode(password, secret);
            console.log(token);
            let sql = "INSERT INTO users( username, password, img) VALUES (?,?,?)";
            yield database_1.default.query(sql, [username, token, req.body.img], (err, result) => {
                if (err) {
                    res.json(err);
                }
                if (result) {
                    console.log(username, password, req.body.img);
                    res.json({ Message: "Game Saved!" });
                }
            });
            // @ Pentru a valida daca username / password este gol.... 
            // if(username == '' && password ==''){
            //      res.json('Please enter a username and pass')
            // }else if(username == '' ){
            //      res.json('Please enter a username ')
            // }else  if(password ==''){
            //      res.json('Please enter a password')
            // }else {
            //      let sql = "INSERT INTO users( username, password, img) VALUES (?,?,?)"
            //      await db.query(sql, [username, password, req.body.img], (err, result)=>{
            //           if(err){
            //                res.json(err)
            //           }
            //           if(result){
            //                console.log(username, password, req.body.img);
            //                res.json({ Message: "Game Saved!" });
            //           }
            //      });
            // }
        });
    }
    // update user
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let sql = "UPDATE users set ?  WHERE id = ?";
            yield database_1.default.query(sql, [req.body, id], (err, result) => {
                res.json({ Message: "The was update" });
            });
        });
    }
    // delete user
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let sql = "DELETE  FROM users  WHERE id = ?";
            yield database_1.default.query(sql, [id], (err, result) => {
                res.json({ Message: "Delete" + ' - ' + id });
            });
        });
    }
}
const GamesController = new gamesController();
exports.default = GamesController;
