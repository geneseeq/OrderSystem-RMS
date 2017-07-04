var captchapng = require('captchapng');
var sendMale=require('../../utils/sendMail');
//生成验证码
exports.generateCode = function (req, callback) {
    console.log("测试");
    var width = !isNaN(parseInt(req.query.width)) ? parseInt(req.query.width) : 100;
    var height = !isNaN(parseInt(req.query.height)) ? parseInt(req.query.height) : 30;
    var code = parseInt(Math.random() * 9000 + 1000);
    req.session.code = code;
    
    var p = new captchapng(width, height, code);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    callback(imgbase64);
}

exports.generateCodeEmail = function (req, callback) {
    console.log("测试");
    var code = parseInt(Math.random() * 9000 + 1000);
    console.log(sendMale);
    req.session.codeEmail = code;
    var result= sendMale(code,req.body.Email,function(result){
         callback(result);
    });
}
exports.CheckCode = function (req) {
  return req.session.codeEmail == req.body.Code;
}