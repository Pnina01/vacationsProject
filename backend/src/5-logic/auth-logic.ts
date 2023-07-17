import { OkPacket } from "mysql";
import cyber from "../2-utils/cyber";
import hash from "../2-utils/hash";
import dal from "../2-utils/dal";
import CredentialsModel from "../4-models/credentials-model";
import UsersModel from "../4-models/users-model";
import { UnauthorizedErrorModel, ValidationErrorModel } from "../4-models/error-model";

async function register(user: UsersModel): Promise<string> { 
    const error = user.validate();
    if (error) throw new ValidationErrorModel(error);
    user.password = hash(user.password);
    const sql = `INSERT INTO users (userId, firstName, lastName, username, email, password, role) VALUES(
                    DEFAULT, ?, ?,?, ?, ?, ?)`;
    const result: OkPacket = await dal.execute(sql, [user.firstName, user.lastName,user.username, user.email, user.password, 2]);
    user.userId = result.insertId;
    delete user.password;
     const token = cyber.getNewToken(user)
     return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
   const error = credentials.validate();
    if (error) throw new ValidationErrorModel(error);
   credentials.password = hash(credentials.password);
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    const users = await dal.execute(sql, [credentials.username, credentials.password]);
    const user = users[0];
  if (!user) throw new UnauthorizedErrorModel("Incorrect username or password!")
    delete user.password;
    const token = cyber.getNewToken(user)
    return token;

};

async function usernameExists(username: string): Promise<boolean> {
    const sql = `SELECT
                        COUNT(*) AS usersWithName
                        FROM users
                        WHERE username = ?`;
    const users = await dal.execute(sql, [username]);
    return users[0].usersWithName > 0;
}

export default {
    register,
    login,
    usernameExists
}