var mongodb = require('./config/db'),
    async = require('async');

function User(user){
   this.ID=user.ID,
   this.Account=user.Account,
   this.UserName=user.UserName,
   this.Pwd=user.Pwd,
   this.Phone=user.Phone,
   this.Memo=user.Memo,
   this.CreateTime=new Date(),
   this.CreateUserID=user.CreateUserID,
   this.EditUserID=user.EditUserID,
   this.EditUserTime=user.EditUserTime,
   this.IsActive=user.IsActive,
   this.Email=user.Email,
   this.Address=user.Address
   
}
module.exports=User;
//存储用户信息
User.prototype.save=function(callback){
   var user={
    Account=this.Account,
    UserName=this.UserName,
    Pwd=this.Pwd,
    Phone=this.Phone,
    Memo=this.Memo,
    CreateTime=new Date(),
    CreateUserID=this.CreateUserID,
    EditUserID=this.EditUserID,
    EditUserTime=this.EditUserTime,
    IsActive=this.IsActive,
    Email=this.Email,
    Address=this.Address
   }
   async.waterfall([
    function(cb) {
      mongodb.open(function (err, db){
        cb(err, db) 
      }) 
    },
    function(db, cb) {
      db.collection("users", function (err, collection) {
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
User.prototype.update=function(callback){
   var user={
   ID=this.ID,
   Account=this.Account,
   UserName=this.UserName,
   Pwd=this.Pwd,
   Phone=this.Phone,
   Memo=this.Memo,
   CreateTime=new Date(),
   CreateUserID=this.CreateUserID,
   EditUserID=this.EditUserID,
   EditUserTime=this.EditUserTime,
   IsActive=this.IsActive,
   Email=this.Email,
   Address=this.Address
   }
   async.waterfall([
    function(cb) {
      mongodb.open(function (err, db){
        cb(err, db) 
      }) 
    },
    function(db, cb) {
      db.collection("users", function (err, collection) {
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