var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
    //service: 'qq',
    host: "smtp.exmail.qq.com", // 主机
    secure: true, // 使用 SSL
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
        //user: '824930117@qq.com',
        user: 'wei.hu@geneseeq.com',
        //这里密码不是qq密码，是你设置的smtp密码
        //pass: 'nlgdmdecwxhsbbgb'
        pass:'UHXpEeK272btfZDP'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols


// send mail with defined transport object
module.exports = function(text, toEmail, callback) {
    var mailOptions = {
        from: 'wei.hu@geneseeq.com', // 发件地址
        to: toEmail, // 收件列表
        subject: '世和基因送样信息表系统邮件通知', // 标题
        //text和html两者只支持一种
        text: '世和基因送样信息表系统', // 标题
        html: '<b>尊敬的世和基因送样信息表系统用户,您收到的验证码为：' + text + '</b>' // html 内容
    };
    var result = transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            callback(false);
            return;
        }
        console.log('Message sent: ' + info.response);
        callback(true);
    });
}