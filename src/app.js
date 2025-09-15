require('dotenv').config({path: './src/config/.env'});

const Server = require('./services/server');
const server = new Server();

server.listen();