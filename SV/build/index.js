"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @import on node.js
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const useragent = require("express-useragent");
const path = __importStar(require("path"));
// @import my module
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const index_image_route_1 = __importDefault(require("./routes/index.image.route"));
const index_calendar_1 = __importDefault(require("./routes/index.calendar"));
const index_admin_1 = __importDefault(require("./routes/index.admin"));
const index_video_1 = __importDefault(require("./routes/index.video"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3001);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(useragent.express());
        this.app.use(express_1.default.static('Static'));
    }
    routes() {
        this.app.use("/", index_routes_1.default);
        this.app.use("/image", index_image_route_1.default);
        this.app.use("/calendar/app", index_calendar_1.default);
        this.app.use("/admin-login", index_admin_1.default);
        this.app.use("/video/streaming", index_video_1.default);
        this.app.use('/images', express_1.default.static(path.join(__dirname, "../public")));
        // this.app.use("/send-email", send_emails);
    }
    start() {
        this.app.listen(this.app.get("port"));
        console.log('\x1b[36m%s\x1b[0m', 'Tufan Constantin Emanuel');
        console.log('\x1b[32m%s\x1b[0m', `[SERVER] run on port: http://localhost:${this.app.get("port")}`);
    }
}
const server = new Server();
server.start();
