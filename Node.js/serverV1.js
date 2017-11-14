var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var URL = require('url');
var querystring = require('querystring');

http.createServer(function(req,res){
  // console.log(req.url);
  // 首页
  if(req.url === '/' || req.url === '/index'){
    // 读文件
    fs.readFile(path.join(__dirname,'./views/index.html'),function(err,data){
      if(err){
        throw err;
      }
      // 返回数据
      res.end(data);
    });
  }
  // 详情页
  else if(req.url === '/detail'){
    // 读文件
    fs.readFile(path.join(__dirname,'./views/detail.html'),function(err,data){
      if(err){
        throw err;
      }
      // 返回数据
      res.end(data);
    });
  }
  // 提交页
  else if(req.url === '/submit'){
    // 读文件
    fs.readFile(path.join(__dirname,'./views/submit.html'),function(err,data){
      if(err){
        throw err;
      }
      // 返回数据
      res.end(data);
    });
  }
  // 添加GET
  else if(req.url.startsWith('/add') && req.method === 'GET'){
    fs.readFile(path.join(__dirname,'./data/data.json'),'utf8',function(err,data){
      if(err && err.code != 'ENOENT'){
        throw err;
      }
      var list = JSON.parse(data || '[]');
      // 获取对象数据，解析URL对象
        // url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
          // urlString <string> 要解析的 URL 字符串。
          // parseQueryString <boolean> 如果为 true，则 query 属性总会通过 querystring 模块的 parse() 方法
          // 生成一个对象。 如果为 false，则返回的 URL 对象上的 query 属性会是一个未解析、未解码的字符串。 
          // 默认为 false。
      var urlObj = URL.parse(req.url,true);
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
      list.push(urlObj.query);
      fs.writeFile(path.join(__dirname,'./data/data.json'),JSON.stringify(list),function(err){
        if(err){
          throw err;
        }
        // console.log('写入成功！');
        res.statusCode = 301;
        res.statusMessage = 'Moved Permanently';
        res.setHeader('location','/');
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
  else if(req.url === '/add' && req.method === 'POST'){
    // 1.读取data.json文件中的数据
    fs.readFile(path.join(__dirname,'./data/data.json'),'utf8',function(err,data){
      if(err){
        throw err;
      }
      // 2.将字符串数组转换为真正的数组
      var list = JSON.parse(data || '[]');
      // 3.获取post方式发送的数据
      // post发送的请求，文件是通过**一段一段**的buffer进行传输的，监听data、end
      var bufferArr = []; // 定义一个空数组存放接收到的一段一段的buffer数据
      // 监听data事件
      req.on('data',function(chunk){
        // 将接收到的一段一段的chunk(buffer数据)存入bufferArr数组中
        bufferArr.push(chunk);
      });
      // 监听end事件
      req.on('end',function(){
        // console.log(bufferArr);
        var buffer = Buffer.concat(bufferArr); // 将存储的一段一段的buffer数据拼成buffer数据
        // console.log(buffer);
        var postData = buffer.toString('utf8'); // 将buffer数据转为字符串（即通过post方式传送的字符串）
        // console.log(postData);
        postData = querystring.parse(postData); // 通过Node.js内置模块querystring的parse方法将字符串转为对象
        // console.log(postData);
        list.push(postData); // 将新数据存入到原来的数据中
        // 将更新过后的数据重新写入到data.json文件中
        fs.writeFile(path.join(__dirname,'./data/data.json'),JSON.stringify(list),function(err){
          if(err){
            throw err;
          }
          res.statusCode = 301;
          res.statusMessage = 'Moved Permanently';
          res.setHeader('location','/');
          res.end();
        });
      });
    });
  }
  // 静态资源
  else if(req.url.startsWith('/resources')){
    fs.readFile(path.join(__dirname,req.url),function(err,data){
      res.setHeader('content-type',mime.getType(req.url));
      if(err){
        throw err;
      }
      res.end(data);
    });
  }
  // 404错误
  else{
    res.end('404');
  }
}).listen(8080,function(){
  console.log('Server was opened in port 8080: http://localhost:8080');    
});