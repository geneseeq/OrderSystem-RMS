/**
 *create by Jason
 *creattime:2017/5/8
 *description:订单服务 
 * functionList：['根据ID获取订单','获取自己所有的订单','管理员获取所有的订单信息'，'新增订单','修改订单']
 * 
 */
var Order = require('../../Modles/orderLists.js');
var Sample = require('../../Modles/Samples.js');
//根据ID获取订单
exports.GetOrderByID = function(data, callBack) {

    }
    //获取自己所有订单
exports.GetOrderLists = function(data, callBack) {
        let pageSize = data.query.pagesize;
        let pageIndex = data.query.pageindex;
        let skipnum = pageSize * (pageIndex - 1);
        let limitnum = parseInt(pageSize);
        let fetchParam = new Order.order(JSON.parse(data.query.f));

        var orderCriteria = {};
        for (var key in fetchParam) {
            orderCriteria[key] = new RegExp(fetchParam[key]);
        }
        Order.fetch(orderCriteria, limitnum, skipnum).then(function(result) {
            if (result && result.length) {
                Order.getCount(orderCriteria).then(function(count) {
                    callBack(true, { result: result, count: count });
                });

            } else {
                callBack(false, "查询失败");
            }
        }.bind(this))
    }
    //获取所在分组的订单，所在组的组长可看 ps:实验室管理员,公司负责人
exports.GetOrderListsByGroup = function(data, callBack) {

}
//管理员获取所有的订单信息
exports.GetOrderListsByAdmin = function(data, callBack) {

}

function AddSample(sampleLists, OrderID) {
    sampleLists.map(function(samp) {
        samp.OrderID = OrderID;
        samp._id ? Sample.updateOneByID(samp._id, new Sample.sample(samp)) : Sample.create(new Sample.sample(samp))
    });

}
//新增订单
exports.AddOrder = function(data, callBack) {
    var orderp = new Order.order(data.body.detail);
    orderp.UserID = data.session.Account ? data.session.Account : ""
    if (data.body.detail._id) {
        Order.updateOneByID(data.body.detail._id, orderp).then(function(result) {
            if (result && result.result && result.result.ok == 1) {
                callBack(true, "修改成功");
                //添加样本
                AddSample(data.body.detail.samples, data.body.detail.OrderID);
            } else {
                callBack(false, "新增失败");
            }
        }.bind(this))
    } else {
        Order.create(orderp).then(function(result) {
            if (result && result.result && result.result.ok == 1) {
                callBack(true, "新增成功");
                let orderidinsert = data.body.detail.OrderID;
                result.insertedIds[0].id.map(function(value) {
                    orderidinsert += value.toString(16);
                })
                AddSample(data.body.detail.samples, orderidinsert);

            } else {
                callBack(false, "新增失败");
            }
        }.bind(this))
    }
}

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
exports.GetOrderDetail = function(data, callBack) {
    var OrderID = data.query.OrderID;
    Order.getOrderByID(OrderID).then(function(result) {
        if (result && result._id) {
            Sample.fetch({ 'OrderID': result.OrderID }).then(function(samples) {
                result.samples = samples;
                callBack(true, result);

            });


        } else {
            callBack(false, result);
        }
    }.bind(this));
}
exports.setOrderPass = function (data,callBack) {
    var OrderId = data.body.formdata._id;
    var CheckUser = data.session.Account ? data.session.Account : "";
    var OrderPass = data.body.formdata;
    OrderPass.Statues = '已审核';
    OrderPass.CheckStatus='审核通过';
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
    OrderPass.Statues = '已审核';
    OrderPass.CheckStatus='审核未通过';
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
exports.setOrderPassMass = function (data,callBack) {
    var updataId = data.body.updataId;
    var OrderId = [];
    for(let i=0;i<updataId.length;i++){
        OrderId.push({_id:updataId[i]})
    }
    var CheckUser = data.session.Account ? data.session.Account : "";
    var OrderPass = {Statues:'已审核',CheckStatus:'审核通过',CheckUser:CheckUser};
    Order.updateInfo(OrderId,OrderPass).then(function (result) {
        if (result && result.result && result.result.ok == 1) {
            callBack(true, "修改成功");
        } else {
            callBack(false, "新增失败");
        }
    })
}
exports.setOrderUnapprovMass = function (data,callBack) {
    var updataId = data.body.updataId;
    var OrderId = [];
    for(let i=0;i<updataId.length;i++){
        OrderId.push({_id:updataId[i]})
    }
    var CheckUser = data.session.Account ? data.session.Account : "";
    var OrderPass = {Statues:'已审核',CheckStatus:'审核未通过',CheckUser:CheckUser};
    Order.updateInfo(OrderId,OrderPass).then(function (result) {
        if (result && result.result && result.result.ok == 1) {
            callBack(true, "修改成功");
        } else {
            callBack(false, "新增失败");
        }
    })
}