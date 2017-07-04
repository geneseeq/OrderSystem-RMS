var mongolass = require('../conf/db.js').mongolass;

let Address = mongolass.model('Address', {
    Account: { type: "string" },//用户账号
    Country: { type: "string" },//国家
    Province: { type: "string" },//省份
    City: { type: "string" },//城市
    Dist: { type: "string" },//县/区
    AddressDetail: { type: "string" },//详细地址
    Postcode: { type: "string" },//邮编
    default:{type:'boolean'}//是否为默认地址
});
let exportAddress = function(newAddress) {
    this.Account = newAddress.Account ? newAddress.Account : "";
    this.Country = newAddress.Country ? newAddress.Country : "";
    this.Province = newAddress.Province ? newAddress.Province : "";
    this.City = newAddress.City ? newAddress.City : "";
    this.Dist = newAddress.Dist ? newAddress.Dist : "";
    this.AddressDetail = newAddress.AddressDetail ? newAddress.AddressDetail : "";
    this.Postcode = newAddress.Postcode ? newAddress.Postcode : "";
    this.default = newAddress.default ? newAddress.default : false;
}
module.exports = {
    // 新增一个地址
    create: function create(AddressAdd) {
        return Address.create(AddressAdd).exec();
    },
    address: exportAddress,
    getAddressByName: function getAddressByName(name) {
        return Address
            .find({ Account: name })
            .addCreatedAt()
            .exec();
    },
    fetch: function fetch(address, limitnum, skipnum) {
        return Address
            .find(address)
            .limit(limitnum)
            .skip(skipnum)
            .addCreatedAt()
            .addAddress()
            .exec();
    },
    getCount: function getCount(AddressAdd) {
        return Address
            .count(AddressAdd);
    },
    updateByID: function updateByID(condition, data) {

        return Address.update(condition, { $set: data },{multi:true}).exec();
    },
    setDefault: function setDefault (id){
        return Address.update(id,{$set:{default:true}}).exec();
    },
    delete: function deleted(id) {
        return Address.remove(id).exec();
    }
};