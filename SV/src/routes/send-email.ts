import { Router } from "express";
class send_email {
     public router: Router = Router();

     constructor() {
          this.config();
     }
     config(): void {
          // this.router.post("/", send_email_controllers.index);
     }
}
const send_emails = new send_email();

export default send_emails.router;
