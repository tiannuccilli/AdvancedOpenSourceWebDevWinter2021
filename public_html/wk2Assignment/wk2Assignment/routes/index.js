var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Index' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});
router.get('/form', function(req, res, next) {
  res.render('form', { title: 'Form' });
});
router.post('/results', function(req, res, next) {
  var name = req.body.name
  var email = req.body.email
  var comments = req.body.comments
  res.render('results', { title: 'Submission',name,email,comments});
});

module.exports = router;
