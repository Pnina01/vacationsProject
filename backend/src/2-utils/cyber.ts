import { Request } from "express";
import jwt from "jsonwebtoken";
import UsersModel from "../4-models/users-model";
import RoleModel from "../4-models/role-model";



const secretKey = "ChickenLittle";

function getNewToken(user: UsersModel): string {

    
    const container = { user };

   
    const options = { expiresIn: "3h" };

    
    const token = jwt.sign(container, secretKey, options);

    return token;
}

function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

        try {

            // Token format: 
            // authorization header --> "Bearer the-token"
            //                           01234567
             // Extract header: 
            const header = request.header("authorization");

           
            if (!header) {
                resolve(false);
                return;
            }
           console.log("there is header")
            
            const token = header.substring(7);

            
            if (!token) {
                console.log("there is no  token")
                resolve(false);
                return;
            }
            console.log("there is a token")

            
            jwt.verify(token, secretKey, err => {

               
                if (err) {
                    resolve(false);
                    return;
                }

                
                resolve(true);
                
            });

        }
        catch (err: any) {
            reject(err);
        }

    });
}

function getUserRoleFromToken(authHeader: string): RoleModel {
    const token = authHeader.substring(7);
    const container = jwt.decode(token) as { user: UsersModel };
    const user = container.user;
    const role = user.role;
    return role;

}

function getUserIdFromToken(authHeader: string): number {
    const token = authHeader.substring(7);
    const container = jwt.decode(token) as { user: UsersModel};
    const user = container.user;
    const userId = user.userId;
    return userId;

}

async function verifyAdmin(request: Request): Promise<boolean> {
    console.log("im in the function ")
    const isLoggedIn = await verifyToken(request);
    console.log(isLoggedIn)
    if(!isLoggedIn) return false;
    const header = request.header("authorization");
    const token = header.substring(7);
    const container: any = jwt.decode(token);
    const user: UsersModel = container.user;

    console.log("Token content:", container);
    console.log("User role:", user.role); 


    return user.role === RoleModel.Admin;
}  
export default {
    getNewToken,
    verifyToken,
    getUserRoleFromToken,
    getUserIdFromToken,
    verifyAdmin
};
