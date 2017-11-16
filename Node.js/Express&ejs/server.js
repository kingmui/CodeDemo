var path = require('path');
var express = require('express');
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

// 将路由挂载到 app 上
app.use(router);
app.listen(config.port,function(){
  console.log(`App listening at http://localhost:${config.port}`);
});