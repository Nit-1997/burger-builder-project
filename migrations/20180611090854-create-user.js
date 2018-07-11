'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      facebookId: {
        type: Sequelize.STRING
      },
      facebookToken: {
        type: Sequelize.STRING
      },
      facebookName: {
        type: Sequelize.STRING
      },
      facebookEmail: {
        type: Sequelize.STRING
      },
      googleId: {
        type: Sequelize.STRING
      },
      googleToken: {
        type: Sequelize.STRING
      },
      googleEmail: {
        type: Sequelize.STRING
      },
      googleName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      age:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      gender:{
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};