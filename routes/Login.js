var express = require('express');
var router = express.Router();
var adminService = require('../Service/Admin/AdminService.js');
var jwtHelper = require("../utils/jwthelper");
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', {
        title: '世和订单系统'
    });
});

router.post('/SignUp',function (req,res,next) {
    adminService.SignUp(req,function (isSuccess,data) {
        var resultData = {};
        resultData.isSuccess = true;
        resultData.msg = data;
        return res.json(resultData);
    })
})

//登录
router.post("/SignIn", function(req, res, next) {
    var resultData = {};
    if (true || req.session.codeEmail == req.body.Code) {
        adminService.SignIn(req.body, function(flage, msg) {
            resultData.isSuccess = flage;
            resultData.msg = msg.msg;
            resultData.Phone=msg.Phone;
            resultData.backurl = req.backurl;
            resultData.UserName=msg.UserName;
            if (flage) {
                req.session.Account = req.body.Account;
                req.session.IsLogin = true;
                resultData.Account = req.body.Account;
                
                return res.json(Object.assign({}, jwtHelper.genToken(resultData), resultData));
            }
            return res.json(resultData);

        }.bind(this));
    } else {
        resultData.isSuccess = false;
        resultData.msg = "验证码不正确!";
        return res.json(resultData);
    }
});
module.exports = router;