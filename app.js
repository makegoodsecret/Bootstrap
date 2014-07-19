require("node-codein")

var http = require('http');
var app = require('./server.js');

//  --- SERVER ---
http.createServer(app).listen(app.get('port'), "localhost" ,function () {
    console.log('项目成功启动：启动端口 ' + app.get('port'));
});
