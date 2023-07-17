import path from "path";

class AppConfig {

    // Database
   
    public host = "localhost" // Computer name/ address of our database
    public user = "root" // Database user
    public password = "" // Database password
    public database = "vacationsPlanner" // Database name
    public imagesFolder = path.join(__dirname, "..", "1-assets", "images");//"Images location

    // Server port
    public port = 3001

}

const appConfig = new AppConfig()

export default appConfig

