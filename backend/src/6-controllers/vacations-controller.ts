import express, {Request, Response, NextFunction} from "express";
import vacationsLogic from "../5-logic/vacations-logic";
import VacationsModel from "../4-models/vacations-model";
import verifyAdmin from "../3-middleware/verify-admin";
//import safeDelete from "../2-utils/safe-delete";


const router = express.Router()

// GET http://localhost:3001/api/vacations
router.get("/", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        const vacations = await vacationsLogic.getAllVacations()
        response.json(vacations)
     }
    catch(err:any) {
        next(err)
    }
})

// GET http://localhost:3001/api/vacations/:id
router.get("/:id" , async (request:Request,response:Response,next:NextFunction)=> {
    try {
        const id = +request.params.id; 
        const vacation = await vacationsLogic.getOneVacation(id); 
        if(!vacation) return response.status(404).send(`id ${id} not found..`);
        response.json(vacation); 
    }
    catch (err) {
        next(err)
    }
});

// POST http://localhost:3001/api/vacations
router.post("/",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image; 
        const vacation = new VacationsModel(request.body);
        const addedVacation = await vacationsLogic.addVacation(vacation);
        response.status(201).json(addedVacation); 
    }
    catch (err: any) {
        next(err); 
    }
});

// PUT http://localhost:3001/api/vacations/:id
router.put("/:id" , verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.imageName = request.files?.image; 
        const vacationId = +request.params.id;
        request.body.vacationId = vacationId;  
        console.log(vacationId)
        const vacation = new VacationsModel(request.body);
        const updatedVacation = await vacationsLogic.updateVacation(vacation);
        response.json(updatedVacation); 
    }
    catch (err: any) {
        next(err); 
    }
});



//Delete vacation by id
router.delete("/:vacationId([0-9]+)",verifyAdmin, async(request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.vacationId
      await vacationsLogic.deleteVacation(id)
        response.sendStatus(204)
    } catch (err) {
        next(err)
    }
})


export default router