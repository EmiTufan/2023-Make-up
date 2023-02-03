"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_calendar_1 = __importDefault(require("../controller/index.controller.calendar"));
class indexCalendar {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", index_controller_calendar_1.default.getCalendarData);
        this.router.post('/PostDataInCalendar_Client', index_controller_calendar_1.default.PostDataInCalendar_Client);
        this.router.get('/Sum', index_controller_calendar_1.default.SumToal);
        this.router.get('/getName', index_controller_calendar_1.default.GetByName);
        this.router.get('/data-client-history/:id', index_controller_calendar_1.default.GetHistory);
    }
}
const indexCALENDAR = new indexCalendar();
exports.default = indexCALENDAR.router;
