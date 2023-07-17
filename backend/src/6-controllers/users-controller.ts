//import safeDelete from "../2-utils/safe-delete";
import verifyAdmin from "../3-middleware/verify-admin";
import usersLogic from "../5-logic/users-logic"

import express, {Request, Response, NextFunction} from "express";


const router = express.Router()

// GET http://localhost:3001/api/users
router.get("/", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        const users = await usersLogic.getAllUsers()
        response.json(users)

    }
    catch(err:any) {
        next(err)
    }
})


// GET http://localhost:3001/api/users/:id
router.get("/:id", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        const id = +request.params.id; 
        const user = await usersLogic.getOneUser(id); 
        if(!user) return response.status(404).send(`id ${id} not found..`);
        response.json(user); 
    }
    catch (err) {
        response.status(500).send
    }
})

// DELETE http://localhost:3001/api/users/:id
router.delete("/:id([0-9]+)",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await usersLogic.deleteOneUser(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});





export default router