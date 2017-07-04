/**
 *create by Jason
 *creattime:2017/5/04
 *description:用户服务服务 
 * functionList：['新用户注册']
 * 
 */
var User = require('../../Modles/Users.js');

function ValidatChain(...chian) {
    let i = 0;
    return function(func, data, callBack, Validation) {
        i++;
        if (i < chian.length) {
            func(data, callBack, chian[i], Validation);
        } else {
            func(data, callBack, {}, Validation);
        }
    }
}

function ValidationUserName(data, callBack, next, Validation) {

    User.getUserByName(data.Account).then(function(result) {
        if (result && result.created_at) {
            callBack(false, "用户名已存在");
        } else {
            Validation(next, data, callBack, Validation);
        }
    });
}

function ValidationEmail(data, callBack, next, Validation) {
    User.getSingleUser({ Email: data.Email }).then(function(result) {
        if (result && result.created_at) {
            callBack(false, "邮箱已存在");
        } else {
            Validation(next, data, callBack, Validation);
        }
    });
}

function InsertUser(data, callBack, next, Validation) {
    var userInsert = Object.assign({}, new User.user({ Account: data.Account, Email: data.Email, Pwd: data.PassWord }));
    User.create(userInsert).then(function(result) {
        if (result && result.result && result.result.ok == 1) {
            callBack(true, "注册成功");
        } else {
            callBack(false, "注册失败");
        }
    });
}
//新用户注册
exports.SignUp = function(data, callBack) {
    let Validation = ValidatChain(ValidationUserName, ValidationEmail, InsertUser);
    Validation(ValidationUserName, data, callBack, Validation);
}
exports.SignIn = function(data, callBack) {

    User.fetch({ Account: data.Account, Pwd: data.PassWord }).then(function(result) {
        if (result && result.length > 0) {
            callBack(true, "登录成功");
        } else {
            callBack(false, "用户名或密码不正确");
        }
    });
}
exports.getUserByName = function(data, callBack) {
    User.getUserByName(data).then(function(result) {
        callBack(true, result);
    });
}
exports.updateUser = function(data, callBack) {
    var updateUser = new User.user(data.body.formdata);
    User.updateOneByID(data.body.formdata._id, updateUser).then(function(result) {
        if (result && result.result && result.result.ok == 1) {
            callBack(true, "修改成功");
        } else {
            callBack(true, "修改出错");
        }

    })
}