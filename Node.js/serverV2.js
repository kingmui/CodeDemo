var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var URL = require('url');
var querystring = require('querystring');
var _ = require('underscore');

http.createServer(function (req, res) {
  // 给res对象添加一个自定义渲染方法
  res.km_render = function (filePath, tplData) {
    fs.readFile(filePath, function (err, data) {
      if (err) {
        throw err;
      }
      var fileData = data;
      // 如果不是静态资源文件，则将得到的数据转为字符串
      if (tplData) {
        // 1. 准备模板字符串
        fileData = fileData.toString('utf8');
        // 2. 模板函数
        var fn = _.template(fileData);
        // 3. 传值
        fileData = fn({
          list: tplData
        });
      }
      res.end(fileData);
    });
  }
  res.km_getData = function(callback){
    fs.readFile(path.join(__dirname, './data/data.json'), 'utf8', function (err, data) {
      if (err && err.code != 'ENOENT') {
        throw err;
      }
      var list = JSON.parse(data || '[]');
      callback(list);
    });
  }
  res.km_pushData = function(list,callback){
    fs.writeFile(path.join(__dirname, './data/data.json'), JSON.stringify(list), function (err) {
      if (err) {
        throw err;
      }
      callback();
    });
  }
  res.km_getPostData = function(req,callback){
    // 获取post方式发送的数据
      // post发送的请求，文件是通过**一段一段**的buffer进行传输的，监听data、end
      var bufferArr = []; // 定义一个空数组存放接收到的一段一段的buffer数据
      // 监听data事件
      req.on('data', function (chunk) {
        // chunk [tʃʌŋk]:厚厚的一块; （某物） 相当大的数量或部分; 强壮、结实的马;
        // 将接收到的一段一段的chunk(buffer数据)存入bufferArr数组中
        bufferArr.push(chunk);
      });
      // 监听end事件
      req.on('end', function () {
        // console.log(bufferArr);
        var buffer = Buffer.concat(bufferArr); // 将存储的一段一段的buffer数据拼成buffer数据
        // console.log(buffer);
        var postData = buffer.toString('utf8'); // 将buffer数据转为字符串（即通过post方式传送的字符串）
        // console.log(postData);
        postData = querystring.parse(postData); // 通过Node.js内置模块querystring的parse方法将字符串转为对象
        // console.log(postData);
        callback(postData);
      });
  }

  // 首页
  if (req.url === '/' || req.url === '/index') {
    fs.readFile(path.join(__dirname, './data/data.json'), 'utf8', function (err, data) {
      if (err && err.code != 'ENOENT') {
        throw err;
      }
      var list = JSON.parse(data || '[]');
      res.km_render(path.join(__dirname, './views/index.html'), list);
    });
  }
  // 详情页
  else if (req.url.startsWith('/detail')) {
    fs.readFile(path.join(__dirname, './data/data.json'), 'utf8', function (err, data) {
      if (err && err.code != 'ENOENT') {
        throw err;
      }
      var list = JSON.parse(data || '[]');
      var urlObj = URL.parse(req.url, true);
      var id = urlObj.query.id;
      for (var i = 0; i < list.length; i++) {
        var targetObj = list[i];
        if (id == targetObj.id) {
          res.km_render(path.join(__dirname, './views/detail.html'), targetObj);
          break;
        }
      }
    });
  }
  // 提交页
  else if (req.url === '/submit') {
    res.km_render(path.join(__dirname, './views/submit.html'));
  }
  // 添加GET
  else if (req.url.startsWith('/add') && req.method === 'GET') {
    res.km_getData(function(list){
      // 获取对象数据，解析URL对象
      // url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
      // urlString <string> 要解析的 URL 字符串。
      // parseQueryString <boolean> 如果为 true，则 query 属性总会通过 querystring 模块的 parse() 方法
      // 生成一个对象。 如果为 false，则返回的 URL 对象上的 query 属性会是一个未解析、未解码的字符串。 
      // 默认为 false。
      var urlObj = URL.parse(req.url, true);
      // console.log(urlObj);
      // Url {
      //   protocol: null,
      //   slashes: null,
      //   auth: null,
      //   host: null,
      //   port: null,
      //   hostname: null,
      //   hash: null,
      //   search: '?title=sss&url=sss&text=sss',
      //   query: { title: 'sss', url: 'sss', text: 'sss' },
      //   pathname: '/add',
      //   path: '/add?title=sss&url=sss&text=sss',
      //   href: '/add?title=sss&url=sss&text=sss' }
      urlObj.query.id = list.length;
      list.push(urlObj.query);
      res.km_pushData(list,function(){
        // console.log('写入成功！');
        res.statusCode = 301;
        res.statusMessage = 'Moved Permanently';
        res.setHeader('location', '/');
        res.end();
      });
      // 第二个参数为false
      // Url {
      //   ...
      //   query: 'title=sss&url=sss&text=sss',
      //   ...
      //   href: '/add?title=sss&url=sss&text=sss' }
    });
  }
  // 添加POST
  else if (req.url === '/add' && req.method === 'POST') {
    res.km_getData(function(list){
      res.km_getPostData(req,function(postData){
        postData.id = list.length;
        list.push(postData); // 将新数据存入到原来的数据中
        // 将更新过后的数据重新写入到data.json文件中
        res.km_pushData(list,function(){
          res.statusCode = 301;
          res.statusMessage = 'Moved Permanently';
          res.setHeader('location', '/');
          res.end();
        });
      });
    });
  }
  // 静态资源
  else if (req.url.startsWith('/resources')) {
    res.setHeader('content-type', mime.getType(req.url));
    res.km_render(path.join(__dirname, req.url));
  }
  // 404错误
  else {
    res.end('404');
  }
}).listen(8080, function () {
  console.log('Server was opened in port 8080: http://localhost:8080');
});