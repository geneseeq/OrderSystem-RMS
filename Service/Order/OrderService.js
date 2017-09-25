/**
 *create by Jason
 *creattime:2017/5/8
 *description:订单服务 
 * functionList：['根据ID获取订单','获取自己所有的订单','管理员获取所有的订单信息'，'新增订单','修改订单']
 * 
 */
var Order = require('../../Modles/orderLists.js');
var Sample = require('../../Modles/Samples.js');
var Attachment=require('../../Modles/OrderAttachment.js');

//获取所有订单
exports.GetOrderLists = function(data, callBack) {
        let pageSize = data.query.pagesize;
        let pageIndex = data.query.pageindex;
        let skipnum = pageSize * (pageIndex>1?pageIndex- 1:0);
        let limitnum = parseInt(pageSize);
        let fetchParam = new Order.order(JSON.parse(data.query.f));
        var orderCriteria = {};
        for (var key in fetchParam) {
            fetchParam[key]!==""?orderCriteria[key] = new RegExp(fetchParam[key]):"";
        }
        orderCriteria["IsSubmit"]={$in:['1','2']} 
        delete orderCriteria.CreateTime;
        Order.fetch(orderCriteria, limitnum, skipnum).then(function(result) {
            if (result && result.length) {
                Order.getCount(orderCriteria).then(function(count) {
                    callBack(true, { result: result, count: count });
                });

            } else {
                callBack(false, {result:[],count:0});
            }
        }.bind(this))
    }
    //获取所在分组的订单，所在组的组长可看 ps:实验室管理员,公司负责人




//修改订单
exports.Update = function(data, callBack) {
    var order = new Order.order(Object.assign({}, data));
    order.OrderID = new Date().getFullYear + Math.random(99999999, 100000000);
    Order.create(order).then(function(result) {
        if (result && result.result && result.result.ok == 1) {
            callBack(true, "新增成功");
        } else {
            callBack(false, "新增失败");
        }
    })
}
//获取订单明细
exports.GetOrderDetail = function(data, callBack) {
    let OrderID = data.query.OrderID;
    
    Order.getOrderByID(OrderID).then(function(result) {
        if (result && result._id) {
            Sample.fetch({ 'OrderID': result.OrderID}).then(function(samples) {
                result.samples = samples;
                Attachment.fetch({'OrderID': result.OrderID}).then(function(Attachments){
                    result.Attachments=Attachments;
                    callBack(true, result);
                });
            });
        } else {
            callBack(false, result);
        }
    }.bind(this));
}
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
exports.setOrderPass = function (data,callBack) {
    var OrderId = data.body.formdata._id;
    var CheckUser = data.session.Account ? data.session.Account : "";
    var OrderPass = data.body.formdata;
    OrderPass.Statues = "1";
    OrderPass.CheckStatus="1";
    OrderPass.CheckUser=CheckUser;
    OrderPass.checkTime= new Date();
    delete OrderPass.CreateTime;
    console.log(OrderPass);
    Order.updateOneByID(OrderId,OrderPass).then(function (result) {
        if (result && result.result && result.result.ok == 1) {
            callBack(true, "修改成功");
        } else {
            callBack(false, "新增失败");
        }
    })
}
exports.setOrderUnapprove = function (data,callBack) {
    var OrderId = data.body.formdata._id;
    var CheckUser = data.session.Account ? data.session.Account : "";
    var OrderPass = data.body.formdata;
    OrderPass.Statues = "2";
    OrderPass.CheckStatus="2";
    OrderPass.IsSubmit="2";
    OrderPass.CheckUser=CheckUser;
    OrderPass.checkTime= new Date();
    delete OrderPass.CreateTime;
    console.log(OrderPass);
    Order.updateOneByID(OrderId,OrderPass).then(function (result) {
        if (result && result.result && result.result.ok == 1) {
            callBack(true, "修改成功");
        } else {
            callBack(false, "新增失败");
        }
    })
}