const express = require('express');
const server = express();

const router = express.Router();

const functions = require('functions'),
    controllers = require('controllers');

const orderController = controllers.order;

router.route('/create')
  .post(orderController.create);

router.route('/getIngredients')
      .get(orderController.getIngredients);

server.use('/', router);

module.exports = server;