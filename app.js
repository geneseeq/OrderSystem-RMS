var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routers = require('./routes/routers');
var session = require('express-session');
var app = express();
var apiAuth = require("./utils/Validauth");
var MongoStore = require('connect-mongo')(session);
//避免dot-hell
global.appRequire = function(path) {
        return require(path.resolve(__dirname, path));
    }
    // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//加载session
app.use(session({
    secret: 'mx20170503',
    name: 'mx',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({   //创建新的mongodb数据库
        host: '127.0.0.1',    //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
        port: 27017,          //数据库的端口号
        url:'mongodb://geneorderuser:sk39xk2si@120.55.161.104:27017/orderSystem'  ,
        db: 'orderSystem',        //数据库的名称。
        cookieSecret: 'orderSystem',
        mongodb:'mongodb://geneorderuser:sk39xk2si@120.55.161.104:27017/orderSystem'  ,
     })
}));
app.use(express.static(path.join(__dirname, 'public')));

app.all('/*', [apiAuth]);
routers(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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