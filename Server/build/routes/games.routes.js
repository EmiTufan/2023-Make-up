"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const games_controller_1 = __importDefault(require("../controller/games.controller"));
class GamesRouters {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", games_controller_1.default.list);
        this.router.get("/:id", games_controller_1.default.getOne);
        this.router.post("/", games_controller_1.default.create);
        this.router.put("/:id", games_controller_1.default.update);
        this.router.delete("/:id", games_controller_1.default.delete);
    }
}
const gamesRouters = new GamesRouters();
exports.default = gamesRouters.router;
