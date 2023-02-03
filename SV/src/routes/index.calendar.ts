import { Router } from "express";
import IndexControllerCalendar from "../controller/index.controller.calendar";

class indexCalendar {
    public router: Router = Router();

     constructor() {
          this.config();
     }
     config(): void {
        this.router.get("/", IndexControllerCalendar.getCalendarData);
        this.router.post('/PostDataInCalendar_Client', IndexControllerCalendar.PostDataInCalendar_Client)
        this.router.get('/Sum', IndexControllerCalendar.SumToal)
         this.router.get('/getName', IndexControllerCalendar.GetByName)
         this.router.get('/data-client-history/:id', IndexControllerCalendar.GetHistory)
     }   
}
const indexCALENDAR = new indexCalendar();
export default indexCALENDAR.router;
