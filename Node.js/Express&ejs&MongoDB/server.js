var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
var router = require('./router');

var app = express();
// 在 Express 中使用 ejs 模板引擎
// 1. views, 放模板文件的目录
app.set('views',path.join(__dirname,'./views'));
// 2. 自定义模板引擎
app.engine('html',require('ejs').renderFile);
// 3. view engine, 模板引擎
app.set('view engine','html');
// req.body
// Contains key-value pairs of data submitted in the request body. By default, 
// it is undefined, and is populated when you use body-parsing middleware such as body-parser and multer.
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// urlencoded: 把 post 请求的数据, 转化为对象
// extended: 以前使用第三方模块(qs 需额外安装), 值为 true , 在新版本中可以将值设为 false 以使用内置模块 querystring
app.use(bodyParser.urlencoded({extended:false}));
// 将路由挂载到 app 上
app.use(router);
app.listen(config.port,function(){
  console.log(`App listening at http://localhost:${config.port}`);
});