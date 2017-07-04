var mongolass = require('../conf/db.js').mongolass;

let User = mongolass.model('User', {
    Account: { type: "string" },
    UserName: { type: "string" },
    Pwd: { type: "string" },
    Phone: { type: "string" },
    Memo: { type: "string" },
    CreateTime: new Date(),
    CreateUserID: { type: "string" },
    EditUserID: { type: "string" },
    EditUserTime: { type: "string" },
    IsActive: { type: "string" },
    Email: { type: "string" },
    Address: { type: "string" }
});
let exoprtUser = function(user) {
    this.Account = user.Account ? user.Account : "";
    this.UserName = user.UserName ? user.UserName : "";
    this.Pwd = user.Pwd ? user.Pwd : "";
    this.Phone = user.Phone ? user.Phone : "";
    this.Memo = user.Memo ? user.Memo : "";
    this.CreateTime = new Date();
    this.CreateUserID = user.CreateUserID ? user.CreateUserID : "";
    this.EditUserID = user.EditUserID ? user.EditUserID : "";
    this.EditUserTime = user.EditUserTime ? user.EditUserTime : "";
    this.IsActive = user.IsActive ? user.IsActive : "";
    this.Email = user.Email ? user.Email : "";
    this.Address = user.Address ? user.Address : "";
}
module.exports = {
    // 注册一个用户
    create: function create(user) {
        return User.create(user).exec();
    },
    fetch: function fetch(user, limitnum, skipnum) {
        return User
            .find(user)
            .limit(limitnum)
            .skip(skipnum)
            .addCreatedAt()
            .exec();
    },
    updateOneByID: function updateOneByID(userID, data) {

        return User.update({ _id: userID }, { $set: data }).exec();
    },
    user: exoprtUser,
    // 通过用户名获取用户信息
    getUserByName: function getUserByName(name) {
        return User
            .findOne({ Account: name })
            .addCreatedAt()
            .exec();
    },
    getSingleUser: function getSingleUser(data) {
        return User
            .findOne(data)
            .addCreatedAt()
            .exec();
    }
};