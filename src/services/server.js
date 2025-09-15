const express = require('express')
const cors = require('cors')
const { connection } = require('../models/ConnectionLocal');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.pathsMySql = {
            auth: '/api/auth',
            prueba: '/api/prueba',
            heroes: '/api/heroes',
            multimedias: '/api/multimedias',
        }

        this.app.get('/', function (req, res) {
            res.send('Hola Mundo a todos desde la Clase...')
        })
       
        //Aqui me conecto a la BD
        this.dbConnection().then(r => {

            //Middlewares
            this.middlewares();

            //Routes
            this.routes();

        });

    }

    async dbConnection() {
        try {
            await connection.authenticate();
            console.log('Connection OK a MySQL.');
        } catch (error) {
            console.error('No se pudo Conectar a la BD MySQL', error);
        }
    }

    routes() {
        //this.app.use(this.pathsMySql.auth, require('../routes/MySqlAuth'));
        //this.app.use(this.pathsMySql.prueba, require('../routes/prueba'));
        this.app.use(this.pathsMySql.heroes, require('../routes/heroe.route'));
    }

    middlewares() {
        //CORS
        //Evitar errores por Cors Domain Access
        //Usado para evitar errores.
        this.app.use(cors());

        //Lectura y Parseo del body
        //JSON
       
        //JSON (JavaScript Object Notation)
        //es un formato ligero de intercambio de datos.
        //JSON es de fácil lectura y escritura para los usuarios.
        //JSON es fácil de analizar y generar por parte de las máquinas.
        //JSON se basa en un subconjunto del lenguaje de programación JavaScript,
        //Estándar ECMA-262 3a Edición - Diciembre de 1999.
       
        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;