import { Router } from "express";
import checkTOkens from "../checkHeaderRequest/check";
import imageControllers from "../controller/index.controller.image";
import multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public')
    },
    filename: (req, file, callBack) => {
        callBack(null, `FunOfHeuristic_${file.originalname}`)
    }
  })
 
const upload = multer({ storage: storage })


class IndexRoutes {
     public router: Router = Router();

     constructor() {
                this.config();
     }
     config(): void {
         this.router.get('/get-img',  imageControllers.listImage)
         this.router.post('/multiple-img', imageControllers.multipleImg)
         this.router.get('/profile/img/getdata', imageControllers.getProfileImage)
         this.router.put('/profile/img/setup', imageControllers.postprofileimage)
         this.router.delete('/delete-img-id/:id', imageControllers.deleteimagebyId)
         this.router.post('/profile/client/image', imageControllers.postProfileClientImage)
         this.router.post('/get/imge/profile/client', imageControllers.profileClientGet)
        }   
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
