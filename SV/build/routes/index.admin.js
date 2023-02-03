"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const edit_admin_web_1 = __importDefault(require("../controller/edit.admin.web"));
const index_controller_admin_1 = __importDefault(require("../controller/index.controller.admin"));
class indexAdmin {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', index_controller_admin_1.default.getAllAdminUser);
        this.router.post('/create-admin', index_controller_admin_1.default.createAdmin);
        this.router.post('/login', index_controller_admin_1.default.getAdminAccount);
        this.router.put('/edit-title', edit_admin_web_1.default.editTitle);
        this.router.get('/get-title', edit_admin_web_1.default.getCurentTitle);
        this.router.post('/add-letter', edit_admin_web_1.default.addletter);
        this.router.get('/get-letter', edit_admin_web_1.default.getLetter);
        this.router.delete('/delete-letter/:id', edit_admin_web_1.default.deleteLetter);
    }
}
const indexAdminLogin = new indexAdmin();
exports.default = indexAdminLogin.router;
