var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var cons  =require('consolidate');
var ejs  = require("ejs");  //require函数表示要加载的模块
var swig = require("swig");  //页面取值{{name}}
var fs  =  require("fs");
var app = express();

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
//更改views文件夹中的后缀为ejs改为html
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', false);
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    if (("put|delete").indexOf(req.body._method)>-1) {
    	req.method = req.body._method ;
	}
    if ('OPTIONS' == req.method) {
    	res.send(200);
    }else {
      next();
    }
};
app.use(allowCrossDomain);

var routes = require('./routes/index');
app.use('/', routes);
/**
 * 注意：路由的顺序，最先匹配的先执行
 */
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	//next(err);
	res.render('404');
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
//---- ROUTER ---

module.exports = app;

