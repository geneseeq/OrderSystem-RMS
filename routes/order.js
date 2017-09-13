var express = require('express');
var router = express.Router();
var orderService = require('../Service/Order/OrderService.js');



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
router.get('/pdfOrder', function(req, res, next) {
    orderService.GetOrderDetail(req, function(isSuccess, data) {
        data.PlatformString=["Novaseq 6000 S2（仅包FC）","Hiseq X Ten","Hiseq 4000","Miseq","Nextseq 500","MiniSeq"][data.Platform]
        var dir={'Novaseq6000_0':"包FC PE 150 bp 数据量 1000-1200Gb","HiseqXten_0":"包lane   PE150 bp  数据量 120Gb"};
        dir["Hiseq4000_0"]="包lane   PE150 bp  数据量 100Gb";
        dir["Miseq_1"]="包FC  PE250 bp 数据量4.5-5.1Gb";
        dir["Miseq_2"]="Miseq 包FC  PE300 bp 数据量13.2-15Gb";
        dir["Nextseq_1"]="High-Output kit 包FC PE150 bp 数据量100-120Gb";
        dir["Nextseq_2"]="Mid-Output kit 包FC PE150 bp 数据量 32.5-39Gb";
        dir["MiniSeq_1"]="High-Output kit 包FC  PE150 bp 数据量6.6-7.5Gb";
        dir["MiniSeq_2"]="Mid-Output kit 包FC  PE150 bp 数据量2.1-2.4Gb";
        data.ReadLengthString =dir[ data.ReadLength];
        data.OrderTypeString =["文库无需世和混合，包lane","文库需世和混合上机，包lane","需要世和混合上机，不包lane包G","文库无需世和混合，包FC(flow cell)"][ data.OrderType];
        data.MarkTypeString=["单标签","双标签"][data.MarkType];
        data.DocmentResulString=["已有2100质检结果（请上传2100原始结果附件）","无2100质检结果，需世和做（收费）","无2100质检结果，不需要"][data.DocmentResult]
        data.CarryDiskString=["是","否"][data.CarryDisk];
        data.OrderTypeCol=['包lane数量','包lane数量','包G数量','包FC数量'][data.OrderType];
        data.isBaoLane=(data.OrderType =='0'||data.OrderType =='1');
        data.isBaoG=(data.OrderType =='2');
        data.Address=data.AcceptAddressString.split(",")[0];
        data.Phone=data.AcceptAddressString.split(",")[1];
        data.UserName=data.AcceptAddressString.split(",")[2];
        res.render('Order/pdfOrder', { title: '首页', layout: null,detail:data});
    })
    
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


module.exports = router;