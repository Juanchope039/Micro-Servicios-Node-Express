const express = require('express')
const cors = require('cors')
const { connection} = require(process.env.BD_ROUTE);
const https = require('https');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.portssh = process.env.PORT_SSH;

        this.pathsMySql = {
            auth: '/api/auth',
            prueba: '/api/prueba',
            heroe: '/api/heroes',
            multimedia: '/api/multimedias',
        }

        this.app.get('/', function (req, res) {
            res.send('Hola Mundo a todos desde la Clase...')
        })
       
        //Aquí me conecto a la BD
        this.dbConnection();

        //credenciales
        this.credentials= this.getCredentials();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();

    }

    async dbConnection() {
        try {
            await connection.authenticate();
            console.log('Connection OK a MySQL.');
        } catch (error) {
            console.error('No se pudo Conectar a la BD MySQL, se  intentará nuevamente en 2s', error);
            // dejar el error para los logs: error
            await new Promise(resolve => setTimeout(resolve, 2000));
            await this.dbConnection();
        }
    }

    getCredentials(){
        let fs = require('fs');
        const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
        const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

        return {
          key: privateKey,
          cert: certificate
        };
    }

    routes() {
        ///this.app.use(this.pathsMySql.auth, require('../routes/MySqlAuth'));
        ///this.app.use(this.pathsMySql.prueba, require('../routes/prueba'));
        this.app.use(this.pathsMySql.heroe, require('../routes/heroe.route'));
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

    async listen() {
        await this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
        /*
        ///let httpsServer = https.createServer(
        ///    this.credentials,
        ///    this.app
        ///);

        ///await httpsServer.listen(this.portssh, () => {
        ///    console.log('Servidor corriendo en puerto', this.portssh);
        ///});*/
    }
}

module.exports = Server;