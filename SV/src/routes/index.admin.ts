import { Router } from "express";
import editAdminWebsite from "../controller/edit.admin.web";
import IndexControllerAdminLogin from "../controller/index.controller.admin";

class indexAdmin {
    public router: Router = Router();

     constructor() {
          this.config();
     }
     config(): void {
        this.router.post('/', IndexControllerAdminLogin.getAllAdminUser)
        this.router.post('/create-admin', IndexControllerAdminLogin.createAdmin)
        this.router.post('/login', IndexControllerAdminLogin.getAdminAccount)
        this.router.put('/edit-title', editAdminWebsite.editTitle)
        this.router.get('/get-title', editAdminWebsite.getCurentTitle)
        this.router.post('/add-letter', editAdminWebsite.addletter)
        this.router.get('/get-letter', editAdminWebsite.getLetter)
        this.router.delete('/delete-letter/:id', editAdminWebsite.deleteLetter)


     }
}
const indexAdminLogin = new indexAdmin();
export default indexAdminLogin.router;
