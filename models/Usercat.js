const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Usercat extends Model {}

Usercat.init(
  {
    // define columns
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    user_id:{
      type:DataTypes.INTEGER,
      references:{
        model:'user',
        key:'id'
      }//foreign key
    },
    category_id:{
      type:DataTypes.INTEGER,
      references:{
        model:'category',
        key:'id'
      }//foreign key
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'usercat',
  }
);

module.exports = Usercat;
