import dal from "../2-utils/dal"
import { v4 as uuid} from "uuid";
import VacationsModel from "../4-models/vacations-model";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-model";
import appConfig from "../2-utils/app-config";
import { OkPacket } from "mysql";

import fs from "fs";
//import path from "path";


async function getAllVacations(): Promise<VacationsModel[]> {
    const sql =`SELECT vacationId ,destination, description, DATE_FORMAT(vacationStartDate,"%Y-%m-%d")as vacationStartDate, DATE_FORMAT(vacationEndDate,"%Y-%m-%d")as vacationEndDate, price,  imageName FROM vacations`;
    const vacations = await dal.execute(sql);
    return vacations;
}

async function getOneVacation(id: number): Promise <VacationsModel>{
    const sql = `SELECT vacationId, destination, description, DATE_FORMAT(vacationStartDate, "%Y-%m-%d") as vacationStartDate, DATE_FORMAT(vacationEndDate, "%Y-%m-%d") as vacationEndDate, price, imageName FROM vacations
                WHERE vacationId = ?`;
    const vacation = await dal.execute(sql,[id]);
    if (vacation.length === 0) return null;
    return vacation;
}

//Update vacation
async function updateVacation(vacation: VacationsModel): Promise<VacationsModel> {
    
    const error = vacation.validate();
   
    if (error) throw new ValidationErrorModel(error);
    

    if (vacation.image) {
       //await safeDelete(`${appConfig.imagesFolder}/${vacation.imageName}`);
          
    try{

        const path = "./src/1-assets/images/" + vacation.imageName
        if (fs.existsSync(path))
        fs.unlinkSync(path);
        }catch(err:any){
        console.log(err)
    }
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf(".")); // .gif / .png / .jpg / .jpeg 
        vacation.imageName = uuid() + extension;
        await vacation.image.mv(`${appConfig.imagesFolder}/${vacation.imageName}`); // mv = move = copy image
        delete vacation.image;
    };
    const sql = `UPDATE vacations SET  
                    destination = ?,
                    description = ?,
                    vacationStartDate = ?,
                    vacationEndDate = ?,
                    price = ?,
                    imageName = ?
                    WHERE vacations.vacationId = ?`;
    const result: OkPacket = await dal.execute(sql, [ vacation.destination, vacation.description, 
    vacation.vacationStartDate, vacation.vacationEndDate, vacation.price,vacation.imageName,vacation.vacationId ]);
    if (result.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationId);
    return vacation;
};


//Add vacation
async function addVacation(vacation: VacationsModel): Promise<VacationsModel> {
    const error = vacation.validate();
    console.log("im before the error")
   if (error) throw new ValidationErrorModel(error);
   console.log("im after validation error")
    if (vacation?.image) {
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
        vacation.imageName = uuid() + extension;
        await vacation.image.mv(`${appConfig.imagesFolder}/${vacation.imageName}`);
        delete vacation.image;
    };
    const sql = `INSERT INTO vacations VALUES( DEFAULT, ?, ?, ?, ?, ?, ? )`;

    const result: OkPacket = await dal.execute(sql, [
    vacation.destination,
    vacation.description, 
    vacation.vacationStartDate,
    vacation.vacationEndDate,
    vacation.price,
    vacation.imageName]);
    vacation.vacationId = result.insertId;
    return vacation;

};



// The order of the vacations is determined first by the vacations that a user follows and then the rest of the vacations:
async function getOrdersByVacationsFollowers(userId: number){
    const allVacations =`SELECT vacations.vacationId ,destination, DATE_FORMAT(vacationStartDate,"%Y-%m-%d")as vacationStartDate, DATE_FORMAT(vacationEndDate,"%Y-%m-%d")as vacationEndDate, price, description , imageName FROM vacations`;
    const sql = `${allVacations} LEFT JOIN (SELECT * FROM followers WHERE userId = ?) as following
                ON vacations.vacationId = following.vacationId
                ORDER BY following.userId DESC`;
    const vacations = await dal.execute(sql,[userId]);
    return vacations;
}

//Delete vacation
async function deleteVacation(vacationId: number): Promise<void> {
const sqlSelectImage = `SELECT imageName FROM vacations WHERE vacations.vacationId = ?`;
    const vacations = await dal.execute(sqlSelectImage, [vacationId]);
    const vacationToDelete = vacations[0];
    if (!vacations) throw new ResourceNotFoundErrorModel(vacationId);
      
    try{

        const path = "./src/1-assets/images/" + vacationToDelete.imageName
        if (fs.existsSync(path))
        fs.unlinkSync(path);
        }catch(err:any){
        console.log(err)
    }

    //await safeDelete(`${appConfig.imagesFolder}/${vacation.imageName}`);
    const sql = `DELETE FROM vacations WHERE vacations.vacationId = ? `;
    const result: OkPacket = await dal.execute(sql, [vacationId]);
  if (result.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacationId);

};



 export default {
    getAllVacations,
    getOneVacation,
    updateVacation,
    addVacation,
    deleteVacation,
    getOrdersByVacationsFollowers

    
}

