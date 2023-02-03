// @import on node.js
    import express, { Application } from "express";
    import morgan from 'morgan'
    import cors from 'cors'
    import dotenv from 'dotenv';
    import useragent = require('express-useragent');
    import * as path from 'path';

// @import my module
import indexRoutes from "./routes/index.routes";
import send_emails from './routes/send-email'
import indexImageRoute from "./routes/index.image.route";
import indexCalendar from "./routes/index.calendar";
import indexAdmin from "./routes/index.admin";
import indexVideo from "./routes/index.video";

dotenv.config();
class Server {
     public app: Application;

     constructor() {
          this.app = express();
          this.config();
          this.routes();


     }
     config(): void {
          this.app.set('port',  process.env.PORT || 3001);
          this.app.use(morgan('dev'))
          this.app.use(cors())
          this.app.use(express.json())
          this.app.use(express.urlencoded({extended: false}))
          this.app.use(useragent.express());
          this.app.use(express.static('Static'))


     }

     routes(): void {
          this.app.use("/", indexRoutes);
          this.app.use("/image", indexImageRoute);
          this.app.use("/calendar/app", indexCalendar);
          this.app.use("/admin-login", indexAdmin )
          this.app.use("/video/streaming", indexVideo )

          this.app.use('/images', express.static(path.join(__dirname, "../public")))
          // this.app.use("/send-email", send_emails);
     }




     start(): void {
          this.app.listen(this.app.get("port"));
          console.log('\x1b[36m%s\x1b[0m', 'Tufan Constantin Emanuel');
          console.log('\x1b[32m%s\x1b[0m',
               `[SERVER] run on port: http://localhost:${this.app.get("port")}`
          );
     }
}
const server = new Server();
server.start();
