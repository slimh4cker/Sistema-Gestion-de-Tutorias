import { Sequelize } from "sequelize";
import dotenv from "dotenv";
    
dotenv.config();

// Declaración de los valores en .env
const { DB_NAME, USER, PASSWORD, HOST, PORT } = process.env;


const sequelize = new Sequelize('asesorias', 'root', '1234',{
    host: 'localhost',  
    dialect: 'mysql',
    port: 3306,
});

export { sequelize };