const { Sequelize } = require('sequelize');
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

module.exports = { connection }

