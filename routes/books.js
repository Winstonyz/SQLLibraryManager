/**
 * code reference: course material: practice-using-data-pug-templates
 * reference 2: course material: using-sequelize-orm-with-express (articles project)
 */
const express = require('express');
const router = express.Router();
var Book = require('../models').Book;


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

//get / - Home route should redirect to the /books route
//get /books - Shows the full list of books
router.get('/', asyncHandler( async( req, res, next ) => {
  var books = await Book.findAll();
  res.render('index',{books, title: 'Books'});
} ));



//get /books/new - Shows the create new book form
router.get( '/new', asyncHandler( async( req, res, next ) => {
  res.render( 'new-book', {book: {}, title: 'New Book'});
}));


//post /books/new - Posts a new book to the database
router.post( '/new', asyncHandler( async( req, res, next ) => {
  let book;
  try{
      book = await Book.create(req.body);
      res.redirect( '/books' );
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        book = await Book.build(req.body);
        res.render('new-book', { book, errors: error.errors, title: 'New Book' });
      } else {
        throw error;
      }
    }
}));


//get /books/:id - Shows book detail form
router.get( '/:id', asyncHandler( async( req, res, next ) => {
  let book;
  book = await Book.findByPk(req.params.id);
  if (book) {
    const book = await Book.findByPk(req.params.id);
    res.render( 'update-book', { book, title: book.title } );
  } else {
    res.sendStatus(404);
  }

}));

//post /books/:id - Updates book info in the database
router.post( '/:id', asyncHandler( async( req, res, next )=>{
  let book;
    book = await Book.findByPk(req.params.id);
    try{
    await book.update(req.body);
    res.redirect('/books');
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        await Book.build(req.body);
        res.render('update-book', { book, errors: error.errors, title: 'Update Book' });
      } else {
        throw error;
      }
    }
}));

//post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting
router.post( '/:id/delete', asyncHandler( async( req, res, next )=>{
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect('/books');
  } else {
    res.sendStatus(404);
  }
}));


module.exports=router;