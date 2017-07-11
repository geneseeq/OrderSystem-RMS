 var config = require('./setting.js');
 var Mongolass = require('mongolass');
 var mongolass = new Mongolass();
 mongolass.connect(config.mongodb);

 var moment = require('moment');
 var objectIdToTimestamp = require('objectid-to-timestamp');
 mongolass.plugin('addCreatedAt', {
     afterFind: function(results) {
         results.forEach(function(item) {
             item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
         });
         return results;
     },
     afterFindOne: function(result) {
         if (result) {
             result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
         }
         return result;
     }
 });
 mongolass.plugin('addInsititution', {
     afterFind: function(results) {
         results.forEach(function(item) {
             item.InsititutionString = item.Country + item.Instituion + item.Department + item.lab + item.secondLab;
         });
         return results;
     },
     afterFindOne: function(result) {
         if (result) {
             result.InsititutionString = result.Country + result.Instituion + result.Department + result.lab + result.secondLab;
         }
         return result;
     }
 });
 mongolass.plugin('addAddress', {
     afterFind: function(results) {
         results.forEach(function(item) {
             item.AddressString = item.Country + item.Province + item.City + item.Dist + '-' + item.AddressDetail;
         });
         return results;
     },
     afterFindOne: function(result) {
         if (result) {
             result.AddressString = result.Country + result.Province + result.City + result.Dist + '-' + result.AddressDetail;
         }
         return result;
     }
 });
 mongolass.plugin('addId', {
     afterFind: function(results) {
         results.forEach(function(item) {
             item.IDI = parseInt(item.OrderID)-2000000;
         });
         return results;
     },
     afterFindOne: function(result) {
         if (result) {
             result.IDI =parseInt(item.OrderID)-2000000;
         }
         return result;
     }
 });
 exports.mongolass = mongolass;