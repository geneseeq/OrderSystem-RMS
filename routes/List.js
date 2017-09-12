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

function loadPage(url) {
    var http = require('http');
    var pm = new Promise(function (resolve, reject) {
    http.get(url, function (res) {
    var html = '';
    res.on('data', function (d) {
    html += d.toString()
    });
    res.on('end', function () {
    resolve(html);
    });
    }).on('error', function (e) {
    reject(e)
    });
    });
    return pm;
    }
router.get('/getOrderList',function (req,res,next) {

    var html=loadPage("http://localhost:3001/orders/pdfOrder?OrderID=02000006&type=edit").then(function(html){
        pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
            if (err) return console.log(err);
            console.log(res); // { filename: '/app/businesscard.pdf' }
        });
        orderService.GetOrderLists(req,function (isSuccess, data) {
            var resultData = {};
            resultData.isSuccess = true;
            resultData.data = data.result;
            resultData.dataNum = data.count;
            return res.json(resultData);
        })
   })
})

module.exports = router;