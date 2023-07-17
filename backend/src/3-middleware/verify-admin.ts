import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { UnauthorizedErrorModel } from "../4-models/error-model";


async function verifyAdmin(request: Request, response: Response, next: NextFunction) {

    try {
        console.log("im in the middleware")
        const isAdmin = await cyber.verifyAdmin(request);
        console.log("im in the middleware after 11")
        if(!isAdmin) throw new UnauthorizedErrorModel("You are not admin");
        next();
    }
    catch(err: any) {
        next(err);
    }
    
}

export default verifyAdmin;
