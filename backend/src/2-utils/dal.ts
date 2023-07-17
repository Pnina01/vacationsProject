import mysql from "mysql"
import appConfig from "./app-config"


// Create a pool of connections to MySQL:
const connection = mysql.createPool({
    host: appConfig.host,
    user: appConfig.user,
    password: appConfig.password,
    database: appConfig.database
})

function execute(sql: string, values?: any[]): Promise<any>{
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}



export default {
    execute
}