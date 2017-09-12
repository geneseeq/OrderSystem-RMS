var Admin = require('../../Modles/Admin.js');
var salt = require('../../utils/salt.js');

exports.SignIn = function(data, callBack) {
    Admin.getAdminByName(data.Account).then(function(result) {
        if (result && result.created_at)
            Admin.fetch({ Account: data.Account, Pwd: salt.encrypt(data.PassWord, result.salt) }).then(function(result) {
                if (result && result.length > 0) {
                    callBack(true, {msg:"登录成功",Phone:result[0].Phone,UserName:result[0].UserName});
                } else {
                    callBack(false,  {msg:"用户名或密码不正确"});
                }
            });
        else {
            callBack(false, {msg:"用户名或密码不正确"});
        }
    });
}
exports.getAdminByName = function(data, callBack) {
    Admin.getAdminByName(data).then(function(result) {
        callBack(true, result);
    });
}
exports.updateAdmin = function(data, callBack) {
    var updateAdmin = new Admin.admin(data.body.formdata);
    Admin.updateOneByID(data.body.formdata._id, updateAdmin).then(function(result) {
        if (result && result.result && result.result.ok == 1) {
            callBack(true, "修改成功");
        } else {
            callBack(true, "修改出错");
        }

    })
}
exports.checkPwd = function (data,callBack) {
    var lastPwd = data.body.lastPwd;
    var Account = data.session.Account;
    Admin.getAdminByName(Account).then(function(result) {
        if (result && result.created_at){
            Admin.fetch({ Account: Account, Pwd: salt.encrypt(lastPwd, result.salt) }).then(function(result) {
                if (result && result.length > 0) {
                    callBack(true, "登录成功");
                } else {
                    callBack(false, "密码输入不正确");
                }
            })}
        else {
            callBack(false, "密码不正确，请重新填写");
        }
    });
}
exports.changePwd = function(data, callBack) {
    var Pwd = data.body.newPwd;
    var Account = data.session.Account;
    Admin.getAdminByName(Account).then(function(result) {
        if (result && result.created_at){
            Admin.updateOneByName(Account, {Pwd:salt.encrypt(Pwd, result.salt)}).then(function(result) {
                if (result && result.result && result.result.ok == 1) {
                    callBack(true, "修改成功");
                } else {
                    callBack(true, "修改出错");
                }

            })
        }else{
            callBack(false, "用户名或密码不正确");
        }

    })

}