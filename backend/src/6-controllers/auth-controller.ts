import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../4-models/credentials-model";
import UsersModel from "../4-models/users-model";
import authLogic from "../5-logic/auth-logic";

const router = express.Router();

// POST http://localhost:3001/api/auth/register
router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const user = new UsersModel(request.body);
       const token = await authLogic.register(user);
       response.status(201).json(token);
    }
    catch (err: any) {
        next(err); 
    }
});

// POST http://localhost:3001/api/auth/login
router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const credentials = new CredentialsModel(request.body);
       const token = await authLogic.login(credentials);
       response.json(token);
    }
    catch (err: any) {
        next(err); 
    }
});

// GET http://localhost:3001/api/auth/:username
router.get("/:username", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const exists = await authLogic.usernameExists(request.params.username);
        response.json(exists);
    }
    catch (err: any) {
        next(err); 
    }
});


export default router;