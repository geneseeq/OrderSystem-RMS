//管理员用户
let Login=require("./Login");
let index=require("./index"); 
let serviceDetail=require("./serviceDetail"); 
let admins=require("./admins.js");
let order=require("./order.js");
let List = require("./List.js");
module.exports=function(app){
    app.use('/Login',Login),
    app.use('/index',index),
    app.use('/serviceDetail',serviceDetail),
    app.use('/admins',admins),
    app.use('/List',List),
    app.use('/orders',order);
}