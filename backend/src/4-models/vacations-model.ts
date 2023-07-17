
import { UploadedFile } from "express-fileupload";
import joi from "joi"
import { join } from "path/posix";



class VacationsModel {
    
    public vacationId: number;
    public destination: string;
    public description: string;
    public vacationStartDate: string;
    public vacationEndDate: string;
    public price: number;
    public image: UploadedFile; // The file uploaded by the frontend.
    public imageName: string; // The name of the image.

    public constructor(vacation: VacationsModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.vacationStartDate = vacation.vacationStartDate;
        this.vacationEndDate = vacation.vacationEndDate;
        this.price = vacation.price;
        this.image = vacation.image;
        this.imageName = vacation.imageName;

    }

    public static validationSchema = joi.object({
        vacationId: joi.number().optional(),
        destination: joi.string().required().min(2).max(20),
        description: joi.string().required().min(2).max(1500),
        vacationStartDate: joi.string().required(),
        vacationEndDate: joi.string().required(),
        price: joi.number().required().min(0).max(30000),
        image: joi.optional(),
        imageName: joi.string().optional()
    });

    

    public validate(): string {
        const result = VacationsModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default VacationsModel;