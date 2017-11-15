var handler = require('./handler');

module.exports = function(req,res){
  // 首页
  if (req.url === '/' || req.url === '/index') {
    handler.index(res);
  }
  // 详情页
  else if (req.url.startsWith('/detail')) {
    handler.detail(req,res);
  }
  // 提交页
  else if (req.url === '/submit') {
    handler.submit(res);
  }
  // 添加GET
  else if (req.url.startsWith('/add') && req.method === 'GET') {
    handler.addGet(req,res);
  }
  // 添加POST
  else if (req.url === '/add' && req.method === 'POST') {
    handler.addPost(req,res);
  }
  // 静态资源
  else if (req.url.startsWith('/resources')) {
    handler.resources(req,res);
  }
  // 404错误
  else {
    res.end('404');
  }
}