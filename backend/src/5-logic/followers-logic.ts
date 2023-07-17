import { OkPacket } from "mysql";
import FollowersModel from "../4-models/followers-model";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-model";
import dal from "../2-utils/dal";



async function addFollow(follow: FollowersModel): Promise<FollowersModel> {
    const error = follow.validate();
    if (error) throw new ValidationErrorModel(error);
    const sql = `INSERT INTO followers VALUES (?, ?)`;
    await dal.execute(sql, [follow.userId, follow.vacationId]);
    return follow;
};

async function deleteFollow(follow: FollowersModel): Promise<void> {
    const sql = `DELETE FROM followers WHERE userId = ? AND vacationId =?`;
    const result: OkPacket = await dal.execute(sql, [follow.userId, follow.vacationId]);
    if (result.affectedRows === 0) throw new ResourceNotFoundErrorModel(follow.vacationId);
};

export default {
 
    addFollow,
    deleteFollow
}