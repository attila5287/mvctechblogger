var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('all', { logged_in: req.session.logged_in, user_id : req.session.user_id });
});

module.exports = router;
