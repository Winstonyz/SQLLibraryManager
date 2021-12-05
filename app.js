var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Use the require method to import the instance of sequelize that was instantiated 
//for you in the models/index.js file when you used the sequelize CLI
var sequelize = require("./models").sequelize;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
