var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var querystring = require('querystring');
module.exports = function(res){
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
  // 获取get方式数据
  res.km_getData = function(callback){
    fs.readFile(path.join(__dirname, './data/data.json'), 'utf8', function (err, data) {
      if (err && err.code != 'ENOENT') {
        throw err;
      }
      var list = JSON.parse(data || '[]');
      callback(list);
    });
  }
  // 写入数据
  res.km_pushData = function(list,callback){
    fs.writeFile(path.join(__dirname, './data/data.json'), JSON.stringify(list), function (err) {
      if (err) {
        throw err;
      }
      callback();
    });
  }
  // 获取post方式数据
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
}