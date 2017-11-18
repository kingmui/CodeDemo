var async = require('async');
var db = require('./db');

const STUDENTS_COL = 'students';
const CITIES_COL = 'cities';
const MAJORS_COL = 'majors';
// Homepage
module.exports.index = function(req, res){
  res.render('index');
}
// Students
module.exports.students = function(req, res){
  db.findAll(STUDENTS_COL, function(err, docs){
    if(err){
      throw err;
    }
    res.render('students', { list : docs });
  });
}
// Student infomation
module.exports.info = function(req, res){
  var _id = db.objectId(req.query._id);
  db.findOne(STUDENTS_COL, _id, function(err, doc){
    if(err){
      throw err;
    }
    res.render('info', { item : doc });
  });
}
// add page(show)
module.exports.showAdd = function(req, res){
  async.parallel({
    cities : function(callback){
      db.findAll(CITIES_COL, function(err, cities){
        callback(err, cities);
      });
    },
    majors : function(callback){
      db.findAll(MAJORS_COL, function(err, majors){
        callback(err, majors);
      });
    }
  },function(err, results){
    if(err){
      throw err;
    }
    res.render('add', { cities : results.cities, majors : results.majors });
  });
}
// add page(deal)
module.exports.dealAdd = function(req, res){
  var obj = {
    sno : req.body.sno,
    sname : req.body.sname,
    sgender : req.body.sgender == 'M' ? '男' : '女',
    sbirthday : req.body.sbirthday,
    sphone : req.body.sphone,
    saddr : req.body.saddr,
    smajor : req.body.smajor
  }
  db.insertOne(STUDENTS_COL, obj, function(err){
    if(err){
      throw err;
    }
    res.redirect('/students');
  });
}
// edit page(show)
module.exports.showEdit = function(req, res){
  var _id = db.objectId(req.query._id);
  async.parallel({
    cities : function(callback){
      db.findAll(CITIES_COL, function(err, cities){
        callback(err, cities);
      });
    },
    majors : function(callback){
      db.findAll(MAJORS_COL, function(err, majors){
        callback(err, majors);
      });
    },
    sinfo : function(callback){
      db.findOne(STUDENTS_COL, _id, function(err, sinfo){
        callback(err, sinfo);
      });
    }
  },function(err, results){
    if(err){
      throw err;
    }
    res.render('edit', { cities : results.cities, majors : results.majors, item : results.sinfo });
  });
}
// edit page(deal)
module.exports.dealEdit = function(req, res){
  var obj = {
    sno : req.body.sno,
    sname : req.body.sname,
    sgender : req.body.sgender == 'M' ? '男' : '女',
    sbirthday : req.body.sbirthday,
    sphone : req.body.sphone,
    saddr : req.body.saddr,
    smajor : req.body.smajor
  }
  // Attention: Post request
  var _id = db.objectId(req.body._id);
  db.updateOne(STUDENTS_COL, _id, obj, function(err){
    if(err){
      throw err;
    }
    res.redirect('/students');
  });
}
// delete
module.exports.delete = function(req, res){
  var _id = db.objectId(req.query._id);
  db.deleteOne(STUDENTS_COL, _id, function(err){
    if(err){
      throw err;
    }
    res.redirect('/students');
  });
}