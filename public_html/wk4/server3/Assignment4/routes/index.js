var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/index', function(req, res, next) {
  var number = req.body.number
  res.render('index', { title: 'Grid',number});
});

module.exports = router;
