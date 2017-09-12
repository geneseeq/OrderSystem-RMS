var mongolass = require('../conf/db.js').mongolass;

let Admin = mongolass.model('Admin', {
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
    Address: { type: "string" },
    salt: { type: "string" }
});
let exoprtAdmin = function(admin) {
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
    this.salt = user.salt ? user.salt : "";
}
module.exports = {
    // 注册一个用户
    create: function create(admin) {
        return Admin.create(admin).exec();
    },
    fetch: function fetch(admin, limitnum, skipnum) {
        return Admin
            .find(admin)
            .limit(limitnum)
            .skip(skipnum)
            .addCreatedAt()
            .exec();
    },
    updateOneByID: function updateOneByID(adminID, data) {

        return Admin.update({ _id: adminID }, { $set: data }).exec();
    },
    admin: exoprtAdmin,
    // 通过用户名获取用户信息
    getAdminByName: function getAdminByName(name) {
        return Admin
            .findOne({ Account: name })
            .addCreatedAt()
            .exec();
    },
    getSingleUser: function getSingleUser(data) {
        return Admin
            .findOne(data)
            .addCreatedAt()
            .exec();
    },
    updateOneByName: function updateOneByID(Name, data) {
                return Admin.update({ Account: Name }, { $set: data }).exec();
    },
};
