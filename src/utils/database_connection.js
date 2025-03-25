import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Declaración de los valores en .env
const { DB_NAME, USER, PASSWORD, HOST, PORT } = process.env;


const sequelize = new Sequelize(DB_NAME, USER, PASSWORD,{
    host: HOST,
    dialect: 'mysql',
    port: PORT,
});

export { sequelize };