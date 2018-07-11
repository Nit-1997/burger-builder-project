const express = require('express');
const server = express();

const router = express.Router();

const functions = require('functions'),
    controllers = require('controllers');

const transactionController = controllers.transaction;

router.route('/create')
  .post(transactionController.create);

server.use('/', router);

module.exports = server;