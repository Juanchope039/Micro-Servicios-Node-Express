const { Sequelize } = require('sequelize');
const HeroeSchema = require("../schemas/Heroe.Schema");

const connection = new Sequelize(
    process.env.BD_DATA_BASE,
    process.env.BD_USER_NAME,
    process.env.BD_PASS , {
        host: 'localhost',
        port: '3306',
        dialect: 'mysql'
    }
);

const models = {
    Heroe:  HeroeSchema.defineHeroe(connection),
}

module.exports = { connection, ...models }

