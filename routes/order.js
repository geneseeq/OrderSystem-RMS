var express = require('express');
var router = express.Router();
var orderService = require('../Service/Order/orderService.js');



/* GET all list. */
router.get('/myorders', function(req, res, next) {
    res.render('Order/myOrders', { title: '世和订单系统', layout: null });
});
router.get('/getList', function(req, res, next) {
    orderService.GetOrderLists(req, function(isSuccess, data) {
        var resultData = {};
        resultData.isSuccess = true;
        resultData.data = data.result;
        resultData.dataNum = data.count;
        return res.json(resultData);
    })
});
router.get('/orderDetail', function(req, res, next) {
    res.render('Order/orderDetail', { title: '首页', layout: null });
});
router.post('/saveOrder', function(req, res, next) {
    orderService.AddOrder(req, function(isSuccess, data) {
        var resultData = {};
        resultData.isSuccess = true;
        resultData.msg = data;

        return res.json(resultData);
    })
});
router.get('/getOrderDetails', function(req, res, next) {
    orderService.GetOrderDetail(req, function(isSuccess, data) {
        var resultData = {};
        resultData.isSuccess = true;
        resultData.data = data;
        resultData.dataNum = data.count;
        return res.json(resultData);
    })

});
router.get('/printOrder', function(req, res, next) {
    res.render('Order/printOrder', { title: '首页', layout: null });
});
router.post('/orderPass',function (req,res,next) {
    orderService.setOrderPass(req,function (isSuccess,data) {
        var resultData = {};
        resultData.data = data;
        return res.json(resultData);
    })
})
router.post('/orderUnapprove',function (req,res,next) {
    orderService.setOrderUnapprove(req,function (isSuccess,data) {
        var resultData = {};
        resultData.data = data;
        return res.json(resultData);
    })
})
router.post('/orderPassMass',function (req,res,next) {
    orderService.setOrderPassMass(req,function (isSuccess,data) {
        var resultData = {};
        resultData.data = data;
        return res.json(resultData);
    })
})
router.post('/orderUnapprovMass',function (req,res,next) {
    orderService.setOrderUnapprovMass(req,function (isSuccess,data) {
        var resultData = {};
        resultData.data = data;
        return res.json(resultData);
    })
})
module.exports = router;