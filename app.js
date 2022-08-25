var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
var categoryRouter = require('./routers/category');
var dashboardRouter = require('./routers/dashboard');
var nominalRouter = require('./routers/nominal');
var voucherRouter = require('./routers/voucher');
var bankRouter = require('./routers/bank');
var paymentRouter = require('./routers/payment');
var authRouter = require('./routers/auth');
var transactionRouter = require('./routers/transaction');
var apiPlayerRouter = require('./routers/api/player');
var apiAuthRouter = require('./routers/api/auth');

const URL = `/api/v1`;

var app = express();
app.use(session({secret: 'keyboard cat',resave: false,saveUninitialized: false}));
app.use(flash());
app.use(methodOverride('_method'))
// view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.use('/dashboard',dashboardRouter);
app.use('/category',categoryRouter);
app.use('/nominal',nominalRouter);
app.use('/voucher',voucherRouter);
app.use('/bank',bankRouter);
app.use('/payment',paymentRouter);
app.use('/silent',authRouter);
app.use('/transaction',transactionRouter);
app.use('/template',express.static(path.join(__dirname,'./public/template/dist')));

/////// API ///////

app.use(`${URL}/player`,apiPlayerRouter);
app.use(`${URL}`,apiAuthRouter);


// catch 404 and forward to error handler
app.use(function (req,res,next)
{
  next(createError(404));
});

// error handler
app.use(function (err,req,res,next)
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
