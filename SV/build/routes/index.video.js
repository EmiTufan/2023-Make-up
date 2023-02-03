"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_video_controller_1 = __importDefault(require("../controller/index.video.controller"));
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/:id", index_video_controller_1.default.video);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
