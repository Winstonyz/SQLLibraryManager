
/**
 * book.js utilizes methods and codes from couse material "Using SQL ORMs with Node.js"
 */

//title:string,author:string,genre:string,year:integer


'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  //Add Sequelize ORM validation and appropriate error messages to ensure 
  //the title and author values cannot be empty when creating a new book, or updating an existing one
  Book.init({
    title: {
      //ensure type: title - string
      type: DataTypes.STRING,
      //Set the allowNull property to false
      allowNull: false,
      validate: {
        notEmpty: {
          // custom error message
          msg: 'Sorry, the title field cannot be left empty',
        }
      },
    },
    author: {
      //ensure type: author - string
      type: DataTypes.STRING,
      //Set the allowNull property to false
      allowNull: false,
      validate: {
        notEmpty: {
          // custom error message
          msg: 'Sorry, the author field cannot be left empty',
        }
      },
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};