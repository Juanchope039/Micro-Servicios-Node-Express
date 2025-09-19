const { Sequelize } = require('sequelize');
const HeroeSchema = require("../schemas/Heroe.Schema");

const connection = new Sequelize(
    process.env.BD_DATA_BASE,
    process.env.BD_USER_NAME,
    process.env.BD_PASS , {
        host: process.env.BD_HOST,
        port:  process.env.BD_PORT,
        dialect: 'mariadb',
        showWarnings: true,
        connectTimeout: 1000,
    }
);

const models = {
    Heroe:  HeroeSchema.defineHeroe(connection),
}

module.exports = { connection, ...models }

