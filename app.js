var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Use the require method to import the instance of sequelize that was instantiated 
//for you in the models/index.js file when you used the sequelize CLI
var sequelize = require("./models").sequelize;


var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Use the sequelize.authenticate() method to asynchronously connect to the 
//database and log out a message indicating that a connection has/hasn’t been 
//established: https://sequelize.org/master/manual/getting-started.html
try {(async() =>{ //using async because: await is only valid in async function - terminal message
  await sequelize.authenticate();
  //Use the sequelize.sync() method to sync the model with the database
  await sequelize.sync()
  console.log('Connection has been established successfully.');
})() }catch (error) {
  console.error('Unable to connect to the database:', error);
}


app.use('/', indexRouter);
app.use('/books', booksRouter);

//Set up your static middleware for serving static files
// error handler
app.use((req,res,next) => {
  //Create a new Error()
  const err = new Error();
  //Set its status property to 404
  err.status=404;
  //Set its message property to a user friendly message
  err.message = "Sorry! We couldn't find the page you were looking for.";
  next(err);
});

//Set up the global error handler
app.use((err, req, res, next) => {
  if(err.status ===404){
    res.status(404).render("page-not-found", {err});
  }
  //Set the err.status property to 500 if status isn't already defined
  else{
    err.status = 500
    //Set the err.message property to a user friendly message if message isn't already defined
    err.message = "Sorry! There was an unexpected error on the server.";
    //Log the err object's status and message properties to the console
    console.error('Sorry! There was an unexpected error on the server. ', err);
    //Render the error template. Be sure that you're passing the {err} that you're updating as the second parameter in the render method. See the error.html file in the example-markup folder for an example of what this page should look like.
    res.status(500).render("server-error", {err});
  }

});


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('includes/error');
// });

module.exports = app;
