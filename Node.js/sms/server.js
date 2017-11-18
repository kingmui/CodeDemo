var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var config = require('./congfig');
var router = require('./router');

var app = express();

// 1. 设置放模板文件的目录
app.set('views',path.join(__dirname,'./htmls'));
// 2. 自定义模板引擎
app.engine('html',require('ejs').renderFile);
// 3. 使用模板引擎
app.set('view engine','html');
app.use(bodyParser.urlencoded({extended : false}));
app.use(router);
app.listen(config.port,function(){
  console.log(`App listening at http://127.0.0.1:${config.port}`);
});