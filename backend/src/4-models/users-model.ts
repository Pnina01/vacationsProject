import Joi from "joi";
import RoleModel from "./role-model";

class UsersModel {
    
    public userId: number;
    public firstName: string;
    public lastName: string;
    public username:  string
    public email: string;
    public password: string;
    public role: RoleModel;

    public constructor(user: UsersModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    public static validationSchema = Joi.object({
        userId: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        username: Joi.string().required().min(4).max(20),
        email: Joi.string().required().min(8).max(20),
        password: Joi.string().required().min(6).max(50),
        role: Joi.forbidden() // check later...
    });

    public validate(): string {
        const result = UsersModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default UsersModel;