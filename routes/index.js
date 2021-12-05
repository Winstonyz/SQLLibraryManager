var express = require('express');
var router = express.Router();

//Import the Book model from the ../models folder
var Book = require('../models').Book //(book.js returns Book)

/* GET home page. */
router.get('/', function(req, res, next) {
  (async() =>{
  const allBooks = await Book.findAll()
  allBooks.then(books => res.json(books))
  //res.render('index', { title: allBooks })})

});

module.exports = router;
