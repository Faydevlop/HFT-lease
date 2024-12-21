var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();




// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { default: mongoose } = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB successfully');
});

mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err}`);
});

var app = express();
const cors = require('cors');
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Serve static files from the 'uploads' folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.use('/', indexRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use('/uploads', express.static('uploads'));

// error handler
app.use(function (err, req, res, next) {
  // Set the response status code, defaulting to 500 if not set in the error
  const statusCode = err.status || 500;
  
  // Set locals, only providing error details in development mode
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send the response with proper status and error message
  res.status(statusCode).json({
    message: 'An error occurred',
    error: err.message, // You can send more detailed error info in development mode
  });
});


const port = 3000

app.listen(port,()=>{
  console.log(`server is running ${port}`);
  
})

module.exports = app;
app.timeout = 60000;
