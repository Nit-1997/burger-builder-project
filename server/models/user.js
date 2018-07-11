'use strict';
module.exports =  (sequelize, Sequelize) => {
  var userSchema = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
  }, {});
       userSchema.associate= function (models) {
          userSchema.hasOne(models.transaction);
      };
  return userSchema;
};
