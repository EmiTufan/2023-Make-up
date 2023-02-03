import { Response, Request, response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import schemaEmails from "./send_email_schema";

class send_email_controller {
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
      subject: `Hello ${lastname} ${firstName}. Please verify your email adresss! `,
      html: schemaEmails.sum(email,firstName,lastname, urladress, tokens),
    };
      transport.sendMail(option)
  }

}
const send_email_controllers = new send_email_controller();
export default send_email_controllers;
