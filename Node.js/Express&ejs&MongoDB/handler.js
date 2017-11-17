var path = require('path');
var db = require('./db');

module.exports.index = function(req,res){
  db.findAll('news',function(docs){
    // console.log(docs);  // [{key:value},{key:value}]
    res.render('index',{list:docs});
  });
}

module.exports.detail = function(req,res){
  // 获取地址栏传过来的 _id, 获取到的是字符串类型数据
  // var _id = req.query._id; // console.log(typeof _id); // string
  // 数据库中的 _id 是 Object 类型: ObjectId("5a0ec64e35ea60309c898df4")
  var _id = db.objectId(req.query._id);
  db.findOne('news',_id,function(doc){
    res.render('detail',{list : doc});
  });
}

module.exports.submit = function(req,res){
  res.render('submit');
}

module.exports.addGet = function(req,res){
  // 使用 req.query 获取 GET 方式提交的表单数据
  var obj = {
    title : req.query.title,
    url : req.query.url,
    text : req.query.text
  };
  db.insertOne('news',obj,function(){
    // 重定向
    res.redirect('/');
  });
}

module.exports.addPost = function(req,res){
  // console.log(req.body); // 未使用 body-parser 前得到的值为 undefined
  // 使用 req.body 获取 POST 方式提交的表单数据
  var obj = {
    title : req.body.title,
    url : req.body.url,
    text : req.body.text
  };
  db.insertOne('news',obj,function(){
    // 重定向
    res.redirect('/');
  }); 
}