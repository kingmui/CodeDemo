var path = require('path');
module.exports.index = function(req,res){
  var list = [{
    title:'english',
    url:'jd.com',
    text:'buy360'
  },{
    title:'chinese',
    url:'mall.com',
    text:'taobao.com'
  }]
  res.render('index',{list:list});
}
module.exports.detail = function(req,res){
  res.send('detail');
}
module.exports.submit = function(req,res){
  res.send('submit');
}
module.exports.addGet = function(req,res){
  res.send('addGet');
}
module.exports.addPost = function(req,res){
  res.send('addPost');
}