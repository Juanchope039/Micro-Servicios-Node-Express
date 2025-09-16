require('dotenv').config({path: './.env'});

const Server = require('./services/server');
const server = new Server();

server.listen();