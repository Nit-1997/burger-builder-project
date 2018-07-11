var express = require('express');
var server = express();

server.use('/transaction', require('./transaction'));
server.use('/user', require('./user'));

module.exports = server;