var mongolass = require('../conf/db.js').mongolass;

let Attachment = mongolass.model('Attachments', {
    AttachmentID: { type: "string" }, //样本ID
    OrderID: { type: "string" }, //送样信息表ID
    UserID: { type: "string" }, //下单人姓名
    UserName: { type: "string" }, //下单人姓名冗余字段
    AttachmentName: { type:"string"},//Phix值
    AttachmentSize: { type:"string"},
    AttachmentAlias: { type:"string"},
});
let exportAttachment = function(Attachment) {
    this.AttachmentID = Attachment.AttachmentID ||""; //样本ID
    this.OrderID = Attachment.OrderID || ""; //送样信息表ID
    this.AttachmentType = Attachment.AttachmentType || ""; //样本类型
    this.UserID = Attachment.UserID|| ""; //下单人姓名
    this.UserName = Attachment.UserName || ""; //下单人姓名冗余字段
    this.AttachmentName= Attachment.AttachmentName || "";//Phix值
    this.AttachmentSize=Attachment.AttachmentSize||"";
    this.AttachmentAlias=Attachment.AttachmentAlias||"";
}
module.exports = {
    // 兴建一个样本
    create: function create(AttachmentAdd) {
        return Attachment.create(AttachmentAdd).exec();
    },
    updateOneByID: function updateOneByID(id,UserID, data) {

        return Attachment.update({ _id: id,UserID:UserID }, { $set: data }).exec();
    },
    delete: function deleted(id,UserID) {
        return Attachment.deleted({ _id:id,UserID:UserID }).exec();
    },
    Attachment: exportAttachment,
    fetch: function fetch(SamplCriteria, limitnum, skipnum) {
        delete SamplCriteria.CreateTime;
        return Attachment
            .find(SamplCriteria)
            .limit(limitnum)
            .skip(skipnum)
            .addCreatedAt()
            .exec();
    },
    getCount: function getCount(SamplCriteria) {
        delete SamplCriteria.CreateTime;
        return Attachment
            .count(SamplCriteria);
    },
    delete: function deleted(id) {
        return Attachment.remove({_id:id}).exec();
    },
    remove: function remove(OrderID,UserID) {
        return Attachment.remove({OrderID:OrderID,UserID:UserID}).exec();
    },
    // 通过用ID获取信息
    getAttachmentByID: function getAttachmentByID(id,UserID) {
        return Attachment
            .findOne({ _id:id,UserID:UserID })
            .addCreatedAt()
            .exec();
    }
};
