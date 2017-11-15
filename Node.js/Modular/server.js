var http = require('http');
var config = require('./config');
var context = require('./context');
var router = require('./router');

http.createServer(function (req, res) {
  context(res);
  router(req,res);
}).listen(config.port, function () {
  console.log(`Server was opened in port ${ config.port }: http://localhost:${ config.port }`);
});