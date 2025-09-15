const { DataTypes } = require('sequelize');
const { connection } = require('../models/ConnectionLocal');


const Heroe = connection.define('heroes',
    {
        'id': {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            autoIncrement: true,
        },
        'nombre': {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
        },
        'bio': {
            type: DataTypes.TEXT,
            allowNull: false
            // allowNull defaults to true
        },
        'img': {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
        },
        'aparicion': {
            type: DataTypes.DATE
            // allowNull defaults to true
        },
        'casa': {
            type: DataTypes.STRING
            // allowNull defaults to true
        },
    },
    {
        //Maintain table name don't plurilize
        freezeTableName: true,


        // I don't want createdAt
        createdAt: false,


        // I don't want updatedAt
        updatedAt: false
    }
);

module.exports = { Heroe }
