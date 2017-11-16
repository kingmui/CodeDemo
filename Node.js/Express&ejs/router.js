var express = require('express');
var handler = require('./handler');
var path = require('path');

var router = express.Router();

router.get('/',handler.index);
router.get('/index',handler.index);
router.get('/detail',handler.detail);
router.get('/submit',handler.submit);
router.get('/add',handler.addGet);
router.post('/add',handler.addPost);
router.use('/resources',express.static(path.join(__dirname,'./resources')));

module.exports = router;