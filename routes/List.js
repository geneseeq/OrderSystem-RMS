var express = require('express');
var router = express.Router();
var orderService = require('../Service/Order/OrderService.js');
var wkhtmltopdf = require('wkhtmltopdf');
var fs=require("fs");
var pdf = require('html-pdf');
var html ='';
var options = { format: 'Letter' };
var baseUrl="http://localhost:3001/orders/pdfOrder?OrderID=";
/* GET List. */
router.get('/orderList', function(req, res, next) {
    res.render('List/orderList', {
        layout: null
    });
});


router.get('/getOrderList',function (req,res,next) {
  
        orderService.GetOrderLists(req,function (isSuccess, data) {
            var resultData = {};
            resultData.isSuccess = true;
            resultData.data = data.result;
            resultData.dataNum = data.count;
            return res.json(resultData);
        })

})

module.exports = router;