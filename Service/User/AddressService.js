var address = require('../../Modles/Address.js');

exports.save = function(data, callBack) {
    var newAddress = new address.address(data.body.formdata);
    newAddress.Account = data.session.Account ? data.session.Account : "JasonCiCi";
    if (data.body.formdata._id) {
        address.updateOneByID(data.body.formdata._id, newAddress).then(function(result) {
            if (result && result.result && result.result.ok == 1) {
                callBack(true, "修改成功");
            } else {
                callBack(false, "新修失败");
            }
        }.bind(this))
    } else {
            address.create(newAddress).then(function (result) {
                if (result && result.result && result.result.ok == 1) {
                    callBack(true, "新增成功");
                } else {
                    callBack(false, "新增失败");
                }
            }.bind(this))
    }
}

exports.getAddress = function(data, callBack) {
    let pageSize = data.query.pagesize;
    let pageIndex = data.query.pageindex;
    let skipnum = pageSize * (pageIndex - 1);
    let limitnum = parseInt(pageSize);

    var addressCriteria = {};
    var Account = data.session.Account ? data.session.Account : "";
    addressCriteria = {Account:Account};
    address.fetch(addressCriteria, limitnum, skipnum).then(function(result) {
        if (result && result.length > -1) {
            address.getCount(addressCriteria).then(function(count) {
                callBack(true, { result: result, count: count });
            });

        } else {
            callBack(false, "查询失败");
        }
    }.bind(this))
}

exports.setDefault = function (data,callBack) {
    let Account = {Account:data.session.Account?data.session.Account:''};
    let id = data.body;
    address.updateByID(Account,{default:false}).then(function (result) {
        address.setDefault(id).then(function (result) {
                callBack(true, '修改成功');
        })
    })
}

exports.delete = function (data,callBack) {
    let id = data.body;
    address.delete(id).then(function (result) {
        callBack(true, '删除成功');
    })
}

exports.find = function (data,callBack) {
    let id = data.body;
    address.fetch(id).then(function (result) {
        if (result && result.length > -1) {
                callBack(true,result);
        } else {
            callBack(false, "查询失败");
        }
    })
}