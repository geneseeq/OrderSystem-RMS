var insititution = require('../../Modles/inistitution.js');
exports.getInistitutionById = function(data, callBack) {

    insititution.getByID(data.query._id).then(function(result) {
        if (result) {
            callBack(true, result);
        } else {
            callBack(true, new insititution.insititution({}));
        }

    })
}
exports.getInistitutions = function(data, callBack) {
    let pageSize = data.query.pagesize;
    let pageIndex = data.query.pageindex;
    let skipnum = pageSize * (pageIndex - 1);
    let limitnum = parseInt(pageSize);
    let fetchParam = new insititution.insititution(JSON.parse(data.query.f));

    var insititutionCriteria = {};
    for (var key in fetchParam) {
        insititutionCriteria[key] = new RegExp(fetchParam[key]);
    }
    insititutionCriteria.UserID = data.session.Account ? data.session.Account : "JasonCiCi"
    insititution.fetch(insititutionCriteria, limitnum, skipnum).then(function(result) {
        if (result && result.length > -1) {
            insititution.getCount(insititutionCriteria).then(function(count) {
                callBack(true, { result: result, count: count });
            });

        } else {
            callBack(false, "查询失败");
        }
    }.bind(this))
}
exports.save = function(data, callBack) {
    var insititutionp = new insititution.insititution(data.body.formdata);
    insititutionp.UserID = data.session.Account ? data.session.Account : "JasonCiCi"
    if (data.body.formdata._id) {
        insititution.updateOneByID(data.body.formdata._id, insititutionp).then(function(result) {
            if (result && result.result && result.result.ok == 1) {
                callBack(true, "修改成功");
            } else {
                callBack(false, "新修失败");
            }
        }.bind(this))
    } else {
        insititution.create(insititutionp).then(function(result) {
            if (result && result.result && result.result.ok == 1) {
                callBack(true, "新增成功");
            } else {
                callBack(false, "新增失败");
            }
        }.bind(this))
    }
}