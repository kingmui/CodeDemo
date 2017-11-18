var express = require('express');
var handler = require('./handler');
var router = express.Router();
// 配置路由
router.get('/',handler.index);
router.get('/index',handler.index);
router.get('/students',handler.students);
router.get('/info',handler.info);
router.get('/add',handler.showAdd);
router.post('/add',handler.dealAdd);
router.get('/edit',handler.showEdit);
router.post('/edit',handler.dealEdit);
router.get('/delete',handler.delete);
module.exports = router;