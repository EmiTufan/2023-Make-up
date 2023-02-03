import { Router } from "express";
import indexControllers from "../controller/index.controller";
import checkTOkens from "../checkHeaderRequest/check";

class IndexRoutes {
     public router: Router = Router();

     constructor() {
          this.config();
     }
     config(): void {
          this.router.get("/",checkTOkens.check, indexControllers.list); 
          this.router.get("/:id", indexControllers.getOne);
          this.router.post("/checkemail", indexControllers.getOneEmail);
          this.router.put("/update-password", indexControllers.update_password);
          this.router.delete("/:id", indexControllers.delete);
          this.router.post("/createUser", indexControllers.createUser);
          this.router.get('/verify-token/:id', indexControllers.confirmEmailAdress );
          this.router.post('/forgetpassword', indexControllers.forgetPassword );
          this.router.post('/calendar-appoints', indexControllers.postCalendar)
          this.router.get('/calendar-appoints/getalldata', indexControllers.dataCalendar)
          this.router.delete('/calendar-appoints/deleteCalendarInfo/:id', indexControllers.deleteCalendarInfo)

     }   
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
