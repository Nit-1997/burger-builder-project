'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
     donorType: {
      type: Sequelize.STRING,
      allowNull: false
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    paymentId:{
      type: Sequelize.STRING,
      allowNull: false
    },
    name:{
      type: Sequelize.STRING,
      allowNull: false
    },
    status:{
      type:Sequelize.STRING,
      allowNull: false
    },
    email:{
     type: Sequelize.STRING,
     allowNull: true
    },
    method:{
      type: Sequelize.STRING,
      allowNull: true
    },
    contact:{
      type: Sequelize.STRING,
      allowNull: true
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }   
});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('transactions');
  }
};