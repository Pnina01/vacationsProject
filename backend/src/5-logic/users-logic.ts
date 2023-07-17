import { OkPacket } from "mysql"
import dal from "../2-utils/dal"
import UsersModel from "../4-models/users-model"


async function getAllUsers(): Promise<UsersModel[]> {
    const sql = "SELECT * FROM users"
    const users = await dal.execute(sql)
    return users
}

async function getOneUser(id: number): Promise<UsersModel>{
    const sql = `SELECT userId, firstName, lastName, email,password, role FROM users
    WHERE userId = ?`;
    const user = await dal.execute(sql,[id]);
    if (user.length === 0) return null;
    return user;
    
}


async function deleteOneUser(id:number): Promise<void>{
    
    const sql = `DELETE FROM users WHERE userId = ${id}`;
    const info: OkPacket = await dal.execute(sql)
 
}


export default {
    getAllUsers,
    getOneUser,
    deleteOneUser,
}