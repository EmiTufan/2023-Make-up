import { Response, Request, request, NextFunction } from "express";
import jwtt, { Secret, JwtPayload } from 'jsonwebtoken';
let jwtSecretKey = 'hellokeys';

class checkTOken {
    bearerHeader:any = []
    public async check( req: Request, res: Response, next: NextFunction){
        let token = req.headers["authorization"];
        if (!token) {
            return res.status(403).send({ message: "No token provided!" });
          }
        const bearerToken = token.split(' ')[1];
        jwtt.verify(bearerToken, jwtSecretKey, (err, decoded) => {
            if (err) {
              return res.status(401).send({ message: "Unauthorized Token!" });
            }
            next();
          });
        };

}


const checkTOkens = new checkTOken();
export default checkTOkens;