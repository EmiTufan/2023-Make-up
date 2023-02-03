"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = __importDefault(require("../controller/index.controller"));
const check_1 = __importDefault(require("../checkHeaderRequest/check"));
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", check_1.default.check, index_controller_1.default.list);
        this.router.get("/:id", index_controller_1.default.getOne);
        this.router.post("/checkemail", index_controller_1.default.getOneEmail);
        this.router.put("/update-password", index_controller_1.default.update_password);
        this.router.delete("/:id", index_controller_1.default.delete);
        this.router.post("/createUser", index_controller_1.default.createUser);
        this.router.get('/verify-token/:id', index_controller_1.default.confirmEmailAdress);
        this.router.post('/forgetpassword', index_controller_1.default.forgetPassword);
        this.router.post('/calendar-appoints', index_controller_1.default.postCalendar);
        this.router.get('/calendar-appoints/getalldata', index_controller_1.default.dataCalendar);
        this.router.delete('/calendar-appoints/deleteCalendarInfo/:id', index_controller_1.default.deleteCalendarInfo);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
