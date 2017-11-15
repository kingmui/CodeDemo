var fs = require('fs');
var path = require('path');
var URL = require('url');
var mime = require('mime');
// 首页
module.exports.index = function (res) {
  fs.readFile(path.join(__dirname, './data/data.json'), 'utf8', function (err, data) {
    if (err && err.code != 'ENOENT') {
      throw err;
    }
    var list = JSON.parse(data || '[]');
    res.km_render(path.join(__dirname, './views/index.html'), list);
  });
}

// 详情页
module.exports.detail = function(req,res){
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
module.exports.submit = function(res){
  res.km_render(path.join(__dirname, './views/submit.html'));
}

// addGet
module.exports.addGet = function(req,res){
  res.km_getData(function(list){
    var urlObj = URL.parse(req.url, true);
    urlObj.query.id = list.length;
    list.push(urlObj.query);
    res.km_pushData(list,function(){
      res.statusCode = 301;
      res.statusMessage = 'Moved Permanently';
      res.setHeader('location', '/');
      res.end();
    });
  });
}

// addPost
module.exports.addPost = function(req,res){
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
module.exports.resources = function(req,res){
  res.setHeader('content-type', mime.getType(req.url));
  res.km_render(path.join(__dirname, req.url));
}