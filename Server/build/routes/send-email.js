"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class send_email {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // this.router.post("/", send_email_controllers.index);
    }
}
const send_emails = new send_email();
exports.default = send_emails.router;
