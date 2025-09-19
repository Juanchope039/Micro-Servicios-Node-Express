const { Sequelize } = require('sequelize');
const HeroeSchema = require("../schemas/Heroe.Schema");
const connection = new Sequelize(
    'myDb',
    'mydb',
    'mariadb',
    {
        host: 'monorail.proxy.rlwy.net',
        port: '23251',
        dialect: 'mysql'
    }
);

const models = {
    Heroe:  HeroeSchema(connection),
}

module.exports = { connection, ...models }

