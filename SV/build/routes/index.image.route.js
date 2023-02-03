"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_image_1 = __importDefault(require("../controller/index.controller.image"));
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public');
    },
    filename: (req, file, callBack) => {
        callBack(null, `FunOfHeuristic_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/get-img', index_controller_image_1.default.listImage);
        this.router.post('/multiple-img', index_controller_image_1.default.multipleImg);
        this.router.get('/profile/img/getdata', index_controller_image_1.default.getProfileImage);
        this.router.put('/profile/img/setup', index_controller_image_1.default.postprofileimage);
        this.router.delete('/delete-img-id/:id', index_controller_image_1.default.deleteimagebyId);
        this.router.post('/profile/client/image', index_controller_image_1.default.postProfileClientImage);
        this.router.post('/get/imge/profile/client', index_controller_image_1.default.profileClientGet);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
