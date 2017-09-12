var mongolass = require('../conf/db.js').mongolass;

let Order = mongolass.model('orders', {
    _id:{type:"string"},
    OrderID: { type: "string" }, //送样信息表ID
    ProgrameID: { type: "string" }, //项目ID
    OrderType: { type: "string" }, //送样信息表类型
    UserID: { type: "string" }, //下单人姓名
    UserName: { type: "string" }, //下单人姓名冗余字段
    Phone: { type: "string" }, //联系电话
    Instituion: { type: "string" }, //机构地址
    Statues: { type: "string" }, //送样信息表状态
    CheckStatus: { type: "string" }, //审核状态
    CheckUser: { type: "string" }, //审核人
    CheckTime: { type: "string" }, //送样信息表审核时间
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
    CreateTime: { type: "date" }, //送样信息表创建时间
    IsExist: { type: "string" } ,//送样信息表是否被删除
    feedback : {type:"string"}, //客户反馈
    checksuggestion:{type:"string"}, //审核意见
    Attachment1Size:{type:"string"},
    Attachment2Size:{type:"string"},
    InstituionString:{type:"string"},
    AcceptAddressString:{type:"string"},
    IsSubmit:{type:"string"},
    GNumber:{type:"string"},//包G的数量
    LaneNumber:{type:"string"},//包lane的数量
    MarkType:{type:"string"},//单双标签
    DocmentResult:{type:"string"},//文库2010结果
    Platform:{type:"string"},//测序平台
    ReadLength:{type:"string"},//读长
    SampleCount:{type:"string"},//样本总数
    SampleTubeCount:{type:"string"},//样本总数管
    SampleMemo:{type:"string"},//样本说明
    SampleSpecies:{type:"string"},//样本物种
    BuildFactory:{type:"string"},//建库方法
    SpecificSequence:{type:"string"},//特定序列
    OrderMemo:{type:"string"},//送样信息表描述备注
    ModuleType:{type:"string"},//送样信息表模板类型，0：高通量测序服务，1表示其它
});

let exoprtorder = function(order) {
    this._id=order.OrderID;
    this.OrderID = order.OrderID|| "";//送样信息表id
    this.ProgrameID = order.ProgrameID || "";//样本id
    this.OrderType = order.OrderType || "";//送样信息表类型
    this.UserID = order.UserID || "";//用户账号
    this.UserName = order.UserName || "";//用户姓名
    this.Phone = order.Phone||"";//联系电话
    this.Instituion = order.Instituion ||"";//机构
    this.InstituionString= order.InstituionString ||"";//机构
    this.Statues = order.Statues || "";//送样信息表状态
    this.CheckStatus = order.CheckStatus||"";//校验状态
    this.CheckUser = order.CheckUser||"";//校验人
    this.CheckTime = order.CheckTime ||"";//校验时间
    this.AcceptAddress = order.AcceptAddress || "";//收货地址
    this.AcceptAddressString = order.AcceptAddressString || "";//收货地址
    this.SendWayBill = order.SendWayBill || "";//发货运单号
    this.ReceiveWayBill = order.ReceiveWayBill || "";//收货运单号
    this.ReceiveAddress = order.ReceiveAddress ||"";//硬盘接受地址
    this.CreateTime = order.CreateTime ||new Date();//创建时间
    this.CarryDisk = order.CarryDisk ||"";//是否携带硬盘
    this.CarryDiskString = order.CarryDiskString ||"";//硬盘号
    this.Attachment1 = order.Attachment1||"";//附件1名称
    this.Attachment2 = order.Attachment2 || "";//附件2名称
    this.Attachment1Size = order.Attachment1Size||"";//附件1大小
    this.Attachment2Size = order.Attachment2Size || "";//附件2大小
    this.Attachment1Alias = order.Attachment1Alias || "";//附件1名称
    this.Attachment2Alias = order.Attachment2Alias || "";//附件2名称
    this.CarrType = order.CarrType || "";//携带方式
    this.CarrTypeMemo = order.CarrTypeMemo ||"";//运送描述
    this.ReceiveWayType = order.ReceiveWayType|| "";//样本接受方式
    this.ReceiveWayTypeString =  order.ReceiveWayTypeString ||"";////样本接受方式描述
    this.IsExist = order.IsExist || "1";//是否存在
    this.feedback = order.feedback ||"";//是否回收
    this.checksuggestion = order.checksuggestion || "";//验证建议
    this.IsSubmit = order.IsSubmit || "0";//是否提交给管理员
   
    this.GNumber = order.GNumber || "";//包G的数量
    this.LaneNumber = order.LaneNumber || "";///包lane的数量
    this.MarkType = order.MarkType || "";//单双标签
    this.DocmentResult= order.DocmentResult || "";//文库2010结果
    this.Platform= order.Platform || "";//测序平台
    this.ReadLength= order.ReadLength || "";//读长
    this.SampleCount= order.SampleCount || "";//样本总数
    this.SampleTubeCount= order.SampleTubeCount || "";//样本总数管
    this.SampleMemo= order.SampleMemo || "";//样本说明
    this.SampleSpecies= order.SampleSpecies || "";//样本物种
    this.BuildFactory= order.BuildFactory || "";//建库方法
    this.SpecificSequence= order.SpecificSequence || "";//特定序列
    this.OrderMemo=order.OrderMemo || "";//送样信息表备注，描述
    this.ModuleType=order.ModuleType || "";//模板类型
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