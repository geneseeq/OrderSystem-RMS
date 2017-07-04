var mongolass = require('../conf/db.js').mongolass;

let Admin = mongolass.model('Admin', {
    Account: { type: "string" },
    UserName: { type: "string" },
    Pwd: { type: "string" },
    Phone: { type: "string" },
    Memo: { type: "string" },
    CreateTime: new Date()
});
let exoprtAdmin = function(admin) {
    this.Account = admin.Account ? admin.Account : "";
    this.UserName = admin.UserName ? admin.UserName : "";
    this.Pwd = admin.Pwd ? admin.Pwd : "";
    this.Phone = admin.Phone ? admin.Phone : "";
    this.Memo = admin.Memo ? admin.Memo : "";
    this.CreateTime = new Date();
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
    user: exoprtAdmin,
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
    }
};
