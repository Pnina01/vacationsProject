import cors from "cors"
import express from "express"
import appConfig from "./2-utils/app-config"
import catchAll from "./3-middleware/catch-all"
import routeNotFound from "./3-middleware/route-not-found"
import vacationsController from "./6-controllers/vacations-controller"
import usersController from "./6-controllers/users-controller"
import authController from "./6-controllers/auth-controller"
import followersController from "./6-controllers/followers-controller"
import imagesController from "./6-controllers/images-controller"
import fileUpload from "express-fileupload"

// Create the server
const server = express()

// Define CORS Policy:
server.use(cors()) // Allow to everyone send me request.

// Define json reading on project
server.use(express.json()) // creates request.body object if exists

server.use(fileUpload())

 server.use("/api/vacations",vacationsController)
 server.use("/api/users",usersController)
 server.use("/api/auth",authController)
 server.use ("/api/vacations/followers" ,followersController)
 server.use ("/api/vacations/images",imagesController)
 
 
server.use("*",routeNotFound)
server.use(catchAll)

// Listen on port
server.listen(appConfig.port, ()=> console.log(`Listening on http://localhost:${appConfig.port}`))