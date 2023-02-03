"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
const send_email_forget_pass_schema_1 = __importDefault(require("./send_email_forget_pass_schema"));
class send_email_controller_forget_password {
    sendEmail(email, firstName, lastname, urladress, tokens) {
        var transport = nodemailer_1.default.createTransport({
            host: process.env.HOST,
            port: 2525,
            auth: {
                user: process.env.AUTH_USER,
                pass: process.env.AUTH_PASSWORD,
            },
            secure: false,
        });
        const option = {
            from: process.env.AUTH_USER,
            to: email,
            subject: `Hello ${lastname} ${firstName}. Update your password!`,
            html: send_email_forget_pass_schema_1.default.sum(email, firstName, lastname, urladress, tokens),
        };
        transport.sendMail(option);
    }
}
const send_email_controller_forget_passwords = new send_email_controller_forget_password();
exports.default = send_email_controller_forget_passwords;
