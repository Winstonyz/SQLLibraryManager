var express = require('express');
var router = express.Router();

//Import the Book model from the ../models folder
var Book = require('../models').Book //(book.js returns Book)

/* GET home page. */

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // Forward error to the global error handler
      next(error);
    }
  }
}

router.get('/', asyncHandler( async(req, res) => {
  //Home route should redirect to the /books route

  res.redirect('/books');
  // const allBooks = await Book.findAll();
  // res.json(allBooks);
}));
module.exports = router;
