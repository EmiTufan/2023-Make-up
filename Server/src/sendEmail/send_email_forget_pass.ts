import { Response, Request, response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import schemEmail_forget_passwords from "./send_email_forget_pass_schema";
class send_email_controller_forget_password{
  sendEmail(email:any, firstName:any, lastname:any , urladress:any, tokens:any ) {

    var transport = nodemailer.createTransport({

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
      html: schemEmail_forget_passwords.sum(email,firstName,lastname, urladress, tokens),
    };
      transport.sendMail(option)
  }

}
const send_email_controller_forget_passwords = new send_email_controller_forget_password();
export default send_email_controller_forget_passwords;
