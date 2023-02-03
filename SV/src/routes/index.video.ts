import { Router } from "express";
import indexVideoStreaming from "../controller/index.video.controller";

class IndexRoutes {
     public router: Router = Router();

     constructor() {
          this.config();
     }
     config(): void {
          this.router.get("/:id", indexVideoStreaming.video);

     }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
