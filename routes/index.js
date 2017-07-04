var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: '世和订单系统' });
});
router.get('/main', function(req, res, next) {
    res.render('main', { title: '首页', layout: null });
});
router.get('/serviceInfo', function(req, res, next) {
    res.render('serviceInfo', { title: '高通量测序服务', layout: null });
});
router.get('/serviceList', function(req, res, next) {
    res.render('serviceList', { title: '高通量测序服务', layout: null });
});
module.exports = router;