var mongolass = require('../conf/db.js').mongolass;

let Sample = mongolass.model('samples', {
    SampleID: { type: "string" }, //样本ID
    OrderID: { type: "string" }, //订单ID
    SampleType: { type: "string" }, //样本类型
    UserID: { type: "string" }, //下单人姓名
    UserName: { type: "string" }, //下单人姓名冗余字段
    SampleAmmount: { type: "string" }, //联系电话
    Units: { type: "string" }, //机构地址
    CreateTime: { type: "string" }, //订单创建时间
    Platform: { type:"string"}, //测序平台
    LaneNumber: { type:"string"}, //包lane数目
    PartLength: { type:"string"}, //文库插入片段长度
    Split: { type:"string"}, //拆分数据
    AtShiHe: { type:"string"}//样品在世和
});
let exportSample = function(sample) {
    this.SampleID = sample.SampleID ? sample.SampleID : ""; //样本ID
    this.OrderID = sample.OrderID ? sample.OrderID : ""; //订单ID
    this.SampleType = sample.SampleType ? sample.SampleType : ""; //样本类型
    this.UserID = sample.UserID ? sample.UserID : ""; //下单人姓名
    this.UserName = sample.UserName ? sample.UserName : ""; //下单人姓名冗余字段
    this.SampleAmmount = sample.SampleAmmount ? sample.SampleAmmount : ""; //联系电话
    this.Platform = sample.Platform ? sample.Platform : ""; //测序平台
    this.LaneNumber = sample.LaneNumber ? sample.LaneNumber : ""; //包lane数目
    this.PartLength = sample.PartLength ? sample.PartLength : ""; //文库插入片段长度
    this.Split = sample.Split ? sample.Split : ""; //拆分数据
    this.AtShiHe = sample.AtShiHe ? sample.AtShiHe : ""; //样品在世和
}
module.exports = {
    // 注册一个用户
    create: function create(SampleAdd) {
        return Sample.create(SampleAdd).exec();
    },
    updateOneByID: function updateOneByID(SampleID, data) {

        return Sample.update({ _id: SampleID }, { $set: data }).exec();
    },
    delete: function deleted(id) {
        return Sample.deleted({ objectid: id }).exec();
    },
    sample: exportSample,
    fetch: function fetch(SamplCriteria, limitnum, skipnum) {
        return Sample
            .find(SamplCriteria)
            .limit(limitnum)
            .skip(skipnum)
            .addCreatedAt()
            .exec();
    },
    getCount: function getCount(SampleAdd) {
        return Sample
            .count(SampleAdd);
    },
    // 通过用ID获取信息
    getSampleByID: function getSampleByID(ID) {
        return Sample
            .findOne({ ID: ID })
            .addCreatedAt()
            .exec();
    }
};
