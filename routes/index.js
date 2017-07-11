var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: '世和订单后台系统' });
});
router.get('/main', function(req, res, next) {
    res.render('main', { title: '首页', layout: null });
});
module.exports = router;