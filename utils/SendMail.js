var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
        user: '824930117@qq.com',
        //这里密码不是qq密码，是你设置的smtp密码
        pass: 'nlgdmdecwxhsbbgb'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols


// send mail with defined transport object
module.exports=function(text,toEmail,callback){
   var mailOptions = {
    from: '824930117@qq.com', // 发件地址
    to:toEmail, // 收件列表
    subject: 'Hello sir', // 标题
    //text和html两者只支持一种
    text: '验证码', // 标题
    html: '<b>您收到的验证码'+text+'</b>' // html 内容
   };
    console.log("11111");
  var result= transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        callback(false);
    }
    console.log('Message sent: ' + info.response);
    callback(true);
  });
}
