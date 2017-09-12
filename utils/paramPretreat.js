//
module.exports = function(req, res, next) {
      req.query.pagesize?"":req.query.pagesize=100;
      req.query.pageindex?"":req.query.pageindex=1;
      req.session.Account =req.session.Account ||"";
      next();
};