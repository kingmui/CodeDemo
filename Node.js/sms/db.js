var mongodb = require('mongodb');
const DB_URL = 'mongodb://127.0.0.1:27017/sms';

// function to connect database
function km_connectDB(callback){
  var mc = mongodb.MongoClient;
  mc.connect(DB_URL,function(err,db){
    if(err){
      throw err;
    }
    callback(db);
  });
}
/**
 * findAll(collectionName, callback(err, docs))
 */
module.exports.findAll = function(collectionName, callback){
  km_connectDB(function(db){
    db.collection(collectionName).find().toArray(function(err, docs){
      db.close();
      callback(err, docs);
    });
  });
}

/**
 * findOne(collectionName, _id, callback(err, doc))
 */
module.exports.findOne = function(collectionName, _id, callback){
  km_connectDB(function(db){
    db.collection(collectionName).findOne({_id}, function(err, doc){
      db.close();
      callback(err, doc);
    });
  });
}
/**
 * insertOne(collectionName, obj, callback(err))
 */
module.exports.insertOne = function(collectionName, obj, callback){
  km_connectDB(function(db){
    db.collection(collectionName).insertOne(obj, function(err){
      db.close();
      callback(err);
    });
  });
}
/**
 * updateOne(collectionName, _id, obj, callback(err))
 */
module.exports.updateOne = function(collectionName, _id, obj, callback){
  km_connectDB(function(db){
    db.collection(collectionName).updateOne({_id}, obj, function(err){
      db.close();
      callback(err);
    });
  });
}
/**
 * deleteOne(collectionName, _id, callback(err))
 */
module.exports.deleteOne = function(collectionName, _id, callback){
  km_connectDB(function(db){
    db.collection(collectionName).deleteOne({_id}, function(err){
      db.close();
      callback(err);
    });
  });
}
/**
 * objectId(strId)
 */
module.exports.objectId = function(strId){
  return mongodb.ObjectId(strId);
}