var mongodb = require('./config/db'),
    async = require('async');

function Institution(institution){
  
   
}
module.exports=Institution;
//存储用户信息
Institution.prototype.save=function(callback){
   var user={
  
   }
   async.waterfall([
    function(cb) {
      mongodb.open(function (err, db){
        cb(err, db) 
      }) 
    },
    function(db, cb) {
      db.collection("institution", function (err, collection) {
        cb(err, collection)
      })
    }, 
    function(collection, cb) {
      collection.insert(user, {save: true}, function(err, user){
        cb(err, user)
      })
    }
  ], function(err, user){
      mongodb.close()
      callback(err, user)
  })   
}
Institution.prototype.update=function(callback){
   var user={
 
   }
   async.waterfall([
    function(cb) {
      mongodb.open(function (err, db){
        cb(err, db) 
      }) 
    },
    function(db, cb) {
      db.collection("institution", function (err, collection) {
        cb(err, collection)
      })
    }, 
    function(collection, cb) {
      collection.insert(user, {save: true}, function(err, user){
        cb(err, user)
      })
    }
  ], function(err, user){
      mongodb.close()
      callback(err, user)
  })   
}