var express = require('express');
var router = express.Router();
var fs = require('fs');
var adminService = require('../Service/Admin/AdminService.js');
/* GET admins listing. */

//跳转到基本信息页面
router.get('/baseInfo', function(req, res, next) {
    res.render('admins/baseInfo');
});


//获取基本信息
router.get('/getAdminInfo', function(req, res, next) {
    var resultData = {};
    adminService.getAdminByName(req.session.Account ? req.session.Account : "", function(issucess, data) {
        resultData.data = data;
        return res.json(resultData);
    })
});
//修改基本信息
router.post('/changeAdminInfo', function(req, res, next) {
    var resultData = {};
    adminService.updateAdmin(req, function(issucess, data) {

        resultData.data = data;
        return res.json(resultData);
    })
});



//密码修改页面
router.get('/password', function(req, res, next) {
    res.render('admins/password', {
        layout: null
    });
});
router.post('/changeUserPwd', function(req, res, next) {
    adminService.checkPwd(req, function(issuccess, data) {
        if (issuccess == true) {
            adminService.changePwd(req, function(issuccess, data) {
                resultData = data;
                resultData.dataNum = data.count;
                resultData.data = data.result;
                return res.json(resultData);
            })
        } else {
            resultData = data;
            resultData.dataNum = data.count;
            resultData.data = data.result;
            return res.json(resultData);
        }
    })
})
module.exports = router;