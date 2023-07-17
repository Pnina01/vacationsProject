import Joi from "joi";

class FollowersModel {

    public userId: number;
    public vacationId: number;

    public constructor (userId: number, vacationId: number) {

        this.userId = userId;
        this.vacationId = vacationId;
    }

    private static validationSchema = Joi.object({
        userId: Joi.number().required().positive().integer(),
        vacationId: Joi.number().optional().positive().integer()
    })

    public validate ():string {
        const result = FollowersModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default FollowersModel;