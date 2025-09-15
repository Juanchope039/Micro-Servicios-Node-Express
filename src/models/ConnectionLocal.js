const { Sequelize } = require('sequelize');

const BD_DATA_BASE = process.env.BD_DATA_BASE;
const BD_USER_NAME = process.env.BD_USER_NAME;
const BD_PASS = process.env.BD_PASS;

const database = BD_DATA_BASE;
const username = BD_USER_NAME;
const pass = BD_PASS;

const connection = new Sequelize(
    database, username, pass, {
        host: 'localhost',
        port: '3306',
        dialect: 'mysql'
    }
);

module.exports = { connection }

