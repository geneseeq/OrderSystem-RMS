var mongolass = require('../conf/db.js').mongolass;

let Inistitution = mongolass.model('inistitutions', {
    Country: { type: "string" }, //国家
    Instituion: { type: "string" }, //机构
    Department: { type: "string" }, //部门、学院
    lab: { type: "string" }, //实验室
    secondLab: { type: "string" }, //二级实验室 
    personInCharge: { type: "string" }, //负责人
    Memo: { type: "string" }, //备注
    UserID: { type: "string" }, //用户ID
    UserName: { type: "string" }, //用户姓名
    IsDefault: { type: "string" }, //是否默认
    CreateTime: { type: "string" } //机构创建时间
});
let exportInistitution = function(newInistitution) {
    this.Country = newInistitution.Country ? newInistitution.Country : ""; //样本ID
    this.Instituion = newInistitution.Instituion ? newInistitution.Instituion : ""; //订单ID
    this.Department = newInistitution.Department ? newInistitution.Department : ""; //样本类型
    this.lab = newInistitution.lab ? newInistitution.lab : ""; //下单人姓名
    this.secondLab = newInistitution.secondLab ? newInistitution.secondLab : ""; //下单人姓名冗余字段
    this.personInCharge = newInistitution.personInCharge ? newInistitution.personInCharge : ""; //联系电话
    this.Memo = newInistitution.Memo ? newInistitution.Memo : ""; //机构地址
    this.CreateTime = newInistitution.CreateTime ? newInistitution.CreateTime : ""; //订单创建时间
    this.UserID = newInistitution.UserID ? newInistitution.UserID : "";
    this.IsDefault = newInistitution.IsDefault ? newInistitution.IsDefault : "";
    this.UserName = newInistitution.UserName ? newInistitution.UserName : "";
}
module.exports = {
    // 注册一个用户
    create: function create(InistitutionAdd) {
        return Inistitution.create(InistitutionAdd).exec();
    },
    updateOneByID: function updateOneByID(InistitutionID, data) {
        return Inistitution.update({ _id: InistitutionID }, { $set: data }).exec();
    },
    delete: function deleted(id) {
        return Inistitution.deleted({ objectid: id }).exec();
    },
    insititution: exportInistitution,
    fetch: function fetch(SamplCriteria, limitnum, skipnum) {
        return Inistitution
            .find(SamplCriteria)
            .limit(limitnum)
            .skip(skipnum)
            .addCreatedAt()
            .addInsititution()
            .exec();
    },
    getCount: function getCount(InistitutionAdd) {
        return Inistitution
            .count(InistitutionAdd);
    }, // 通过用ID获取信息
    getByID: function getSampleByID(ID) {
        return Inistitution
            .findOne({ _id: ID })
            .addCreatedAt()
            .exec();
    }
};