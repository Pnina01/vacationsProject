

import express, {Request, Response, NextFunction} from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import FollowersModel from "../4-models/followers-model";
import followersLogic from "../5-logic/followers-logic";
import cyber from "../2-utils/cyber";


const router = express.Router()





// POST http://localhost:3001/api/vacations/followers/:vacationId/follow
router.post("/:vacationId/follow", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.header("authorization");
        const userId = cyber.getUserIdFromToken(authHeader)
        const vacationId = +request.params.vacationId;
        const follow = new FollowersModel(userId, vacationId);
        const addedFollow = await followersLogic.addFollow(follow);
        response.status(201).json(addedFollow); 
    }
    catch (err: any) {
        next(err); 
    }
});

// DELETE http://localhost:3001/api/vacations/followers/:vacationId/unfollow
router.delete("/:vacationId/unfollow", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.header("authorization");
        const userId = cyber.getUserIdFromToken(authHeader)
        const vacationId = +request.params.vacationId;
        const deleteFollow = new FollowersModel(userId, vacationId);
        await followersLogic.deleteFollow(deleteFollow);
        response.sendStatus(204); 
    }
    catch (err: any) {
        next(err); 
    }
});



export default router