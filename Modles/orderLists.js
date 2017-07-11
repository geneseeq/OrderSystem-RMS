var mongolass = require('../conf/db.js').mongolass;

let Order = mongolass.model('orders', {
    _id:{type:"string"},
    OrderID: { type: "string" }, //订单ID
    ProgrameID: { type: "string" }, //项目ID
    OrderType: { type: "string" }, //订单类型
    UserID: { type: "string" }, //下单人姓名
    UserName: { type: "string" }, //下单人姓名冗余字段
    Phone: { type: "string" }, //联系电话
    Instituion: { type: "string" }, //机构地址
    Statues: { type: "string" }, //订单状态
    CheckStatus: { type: "string" }, //审核状态
    CheckUser: { type: "string" }, //审核人
    CheckTime: { type: "string" }, //订单审核时间
    AcceptAddress: { type: "string" }, //收货地址
    SendWayBill: { type: "string" }, //用户发货的运单号
    ReceiveWayBill: { type: "string" }, //用户收货运单号
    ReceiveAddress: { type: "string" }, //用户收货地址
    CarryDisk: { type: "string" }, //携带硬盘
    CarryDiskString: { type: "string" }, //携带硬盘备注
    CarrType: { type: "string" },
    CarrTypeMemo: { type: "string" },
    Attachment1: { type: "string" },
    Attachment2: { type: "string" },
    Attachment1Alias: { type: "string" },
    Attachment2Alias: { type: "string" },
    ReceiveWayType: { type: "string" },
    ReceiveWayTypeString: { type: "string" },
    CreateTime: { type: "date" }, //订单创建时间
    IsExist: { type: "string" } ,//订单是否被删除
    feedback : {type:"string"}, //客户反馈
    checksuggestion:{type:"string"} //审核意见
});
let exoprtorder = function(order) {
    this._id=order.OrderID;
    this.OrderID = order.OrderID ? order.OrderID : "";
    this.ProgrameID = order.ProgrameID ? order.ProgrameID : "";
    this.OrderType = order.OrderType ? order.OrderType : "";
    this.UserID = order.UserID ? order.UserID : "";
    this.UserName = order.UserName ? order.UserName : "";
    this.Phone = order.Phone ? order.Phone : "";
    this.Instituion = order.Instituion ? order.Instituion : "";
    this.Statues = order.Statues ? order.Statues : "";
    this.CheckStatus = order.CheckStatus ? order.CheckStatus : "";
    this.CheckUser = order.CheckUser ? order.CheckUser : "";
    this.CheckTime = order.CheckTime ? order.CheckTime : "";
    this.AcceptAddress = order.AcceptAddress ? order.AcceptAddress : "";
    this.SendWayBill = order.SendWayBill ? order.SendWayBill : "";
    this.ReceiveWayBill = order.ReceiveWayBill ? order.ReceiveWayBill : "";
    this.ReceiveAddress = order.ReceiveAddress ? order.ReceiveAddress : "";
    // this.CreateTime = order.CreateTime ? order.CreateTime :"";
    //  this.CreateTimestamp = order.CreateTimestamp ? order.CreateTimestamp :"";
    this.CarryDisk = order.CarryDisk ? order.CarryDisk : "";
    this.CarryDiskString = order.CarryDiskString ? order.CarryDiskString : "";
    this.Attachment1 = order.Attachment1 ? order.Attachment1 : "";
    this.Attachment2 = order.Attachment2 ? order.Attachment2 : "";
    this.Attachment1Alias = order.Attachment1Alias ? order.Attachment1Alias : "";
    this.Attachment2Alias = order.Attachment2Alias ? order.Attachment2Alias : "";
    this.CarrType = order.CarrType ? order.CarrType : "";
    this.CarrTypeMemo = order.CarrTypeMemo ? order.CarrTypeMemo : "";
    this.ReceiveWayType = order.ReceiveWayType ? order.ReceiveWayType : "";
    this.ReceiveWayTypeString = order.ReceiveWayTypeString ? order.ReceiveWayTypeString : "";
    this.IsExist = order.IsExist ? order.IsExist : "1";
    this.feedback = order.feedback ? order.feedback : "";
    this.checksuggestion = order.checksuggestion ? order.checksuggestion : "";
}
module.exports = {
    // 注册一个用户
    create: function create(order) {
        return Order.create(order).exec();
    },
    updateOneByID: function updateOneByID(id, data) {
        return Order.update({ _id: id }, { $set: data }, true, true).exec();
    },
    delete: function deleted(id) {
        return Order.deleted({ objectid: id }).exec();
    },
    fetch: function fetch(order, limitnum, skipnum) {
        return Order
            .find(order)
            .limit(limitnum)
            .skip(skipnum)
            .addId()
            .exec();
    },
    getCount: function getCount(order) {
        return Order
            .count(order);
    },
    order: exoprtorder,
    // 通过用户名获取用户信息
    getOrderByID: function getOrderByID(OrderID) {
        return Order
            .findOne({ 'OrderID': OrderID })
            .exec();
    },
    updateInfo: function updateInfo(id,data) {
        return Order.update({$or:id}, { $set: data },{multi:true}, true, true).exec();
    }
};