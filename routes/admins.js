var express = require('express');
var router = express.Router();
var fs = require('fs');
var adminService = require('../Service/Admin/AdminService.js');
/* GET admins listing. */

//跳转到基本信息页面
router.get('/baseInfo', function(req, res, next) {
    res.render('admins/baseInfo');
});
//跳转到基本信息页面
router.get('/address', function(req, res, next) {
    res.render('admins/address', {
        layout: null
    });
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
//机构列表页面
router.get('/inistitution', function(req, res, next) {
    res.render('admins/inistitution', {
        layout: null
    });
});
router.get('/getInistitutionLists', function(req, res, next) {
    var resultData = {};
    inistitution.getInistitutions(req, function(issucess, data) {

        resultData = data;
        resultData.dataNum = data.count;
        resultData.data = data.result;
        console.log(resultData);
        return res.json(resultData);
    });
});
//机构信息明细，新增，修改界面
router.get('/inistitutionDetail', function(req, res, next) {

    res.render('admins/inistitutionDetail', {
        layout: null
    });
});
//获取机构信息明细，新增，修改
router.get('/getInistitutionDetail', function(req, res, next) {
    var resultData = {};
    inistitution.getInistitutionById(req, function(issucess, data) {
        resultData.data = data;
        return res.json(resultData);
    });
});
//获取机构信息明细，新增，修改
router.post('/saveInistitution', function(req, res, next) {
    var resultData = {};
    inistitution.save(req, function(issucess, data) {
        resultData.data = data;
        return res.json(resultData);
    });
});
//获取机构信息明细，新增，修改
router.post('/setDefault', function(req, res, next) {
    var resultData = {};
    inistitution.save(req, function(issucess, data) {
        resultData.data = data;
        return res.json(resultData);
    });
});
//获取县级市菜单
router.get('/getAddressDetails', function(req, res, next) {
    fs.readFile('../public/js/city.min.js', 'utf8', function(err, data) {
        res.send(data);
    })
});
//添加地址信息
router.post('/addAddress', function(req, res, next) {
    var resultData = {};
    address.save(req, function(issucess, data) {
        resultData.data = data;
        return res.json(resultData);
    });
});
//获取用户地址信息
router.get('/getAddressList', function(req, res, next) {
    var resultData = {};
    address.getAddress(req, function(issucess, data) {
        resultData = data;
        resultData.dataNum = data.count;
        resultData.data = data.result;
        return res.json(resultData);
    });
});
//将地址设为默认
router.post('/setAddressDefault', function(req, res, next) {
    address.setDefault(req, function(issucess, data) {
        resultData = data;
        resultData.dataNum = data.count;
        resultData.data = data.result;
        return res.json(resultData);
    });
})
//删除地址
router.post('/deleteAddress', function(req, res, next) {
    address.delete(req, function(issucess, data) {
        resultData = data;
        resultData.dataNum = data.count;
        resultData.data = data.result;
        return res.json(resultData);
    })
})
//编辑查看
router.post('/checkAddress', function(req, res, next) {
    address.find(req, function(issucess, data) {
        resultData = data;
        resultData.dataNum = data.count;
        resultData.data = data.result;
        return res.json(resultData);
    })
})
module.exports = router;