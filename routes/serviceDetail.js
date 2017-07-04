var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/baoLane', function(req, res, next) {
  res.render('serviceDetail/baoLane', {
    title: '世和订单系统'
  });
});

module.exports = router;