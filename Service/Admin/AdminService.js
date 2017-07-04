var Admin = require('../../Modles/Admin.js');

// exports.SignUp = function(data, callBack) {
//     var adminp = data.body;
//     console.log(adminp);
//     Admin.create(adminp).then(function (result) {
//         if (result && result.length > 0) {
//             callBack(true, "登录成功");
//         } else {
//             callBack(false, "用户名或密码不正确");
//         }
//         console.log(result);
//     })
// }
exports.SignIn = function(data, callBack) {
    console.log(data.Account+data.PassWord);
    Admin.fetch({ Account: data.Account, Pwd: data.PassWord }).then(function(result) {
        console.log(result);
        if (result && result.length > 0) {
            callBack(true, "登录成功");
        } else {
            callBack(false, "用户名或密码不正确");
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
