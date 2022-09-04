const SERVER_ENV = require('./server.config');

//Se configura el servidor en modo development
var environment = process.env.NODE_ENV || 'development';

var serverConf = SERVER_ENV[environment];

module.exports = serverConf;