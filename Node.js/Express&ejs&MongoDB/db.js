var mongodb = require('mongodb');
var config = require('./config');

// 连接数据库
function km_connectDB(callback){
  // 获取连接对象
  var mc = mongodb.MongoClient;
  // 使用 connect 方法连接数据库
  mc.connect(config.dbUrl,function(err,db){
    if(err){
      throw err;
    }
    callback(db);
  });
}
// 查询所有信息
module.exports.findAll = function(collectionName, callback){
  km_connectDB(function(db){
    db.collection(collectionName).find().toArray(function(err,docs){
      if(err){
        throw err;
      }
      db.close();
      callback(docs);
    });
  });
}
// 查询单条信息
module.exports.findOne = function(collectionName, _id, callback){
  km_connectDB(function(db){
    db.collection(collectionName).findOne({_id:_id},function(err,doc){
      if(err){
        throw err;
      }
      db.close();
      callback(doc);
    });
  });
}
// 插入一条信息
module.exports.insertOne = function(collectionName,obj,callback){
  km_connectDB(function(db){
    // 插入一条数据
    db.collection(collectionName).insertOne(obj,function(err){
      if(err){
        throw err;
      }
      // 关闭数据库
      db.close();
      callback();
    });
  });
}
// 将字符串类型id转换为对象类型id
module.exports.objectId = function(idStr){
  // 利用 mongodb.ObjectId(id[string]) 方法将字符串类型 _id 转换为对象类型
  return mongodb.ObjectId(idStr);
}