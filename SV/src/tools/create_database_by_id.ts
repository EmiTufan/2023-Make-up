import db_img_user from "../database_img";
import { Response, Request } from "express";

class create_database_by_id {
    public async database(req: Request, res: Response, user: any): Promise<void> {
        let createTodos = `create table if not exists ${user}(
                id INT AUTO_INCREMENT PRIMARY KEY,
                idpost varchar(255)not null,
                name varchar(255)not null,
                email varchar(255)not null,
                phonenr varchar(255)not null,
                tipmachiaj varchar(255)not null,
                descriere varchar(255)not null,
                ora varchar(20)not null,
                pret varchar(20)not null,
                oraEnd varchar(20)not null,
                data date not null
            )`;

        await db_img_user.query(createTodos, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
        });
    }
}
const create_database = new create_database_by_id();
export default create_database.database;
