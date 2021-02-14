const e = require('express');
var express = require('express');
var router = express.Router();
var employeeCrtls = require('./employee.controller')

router.get('/employees',employeeCrtls.getAllEmployees)
router.get('/employee/:employeeid',employeeCrtls.getEmployee)
router.post('/employees',employeeCrtls.employeeCreate)
router.put('/employees/:employeeid',employeeCrtls.employeeUpdate)
router.delete('/employees/:employeeid',employeeCrtls.deleteEmployee)
router.get('/employees/:colInput/:valInput',employeeCrtls.searchTable)
router.get('/employees/:colInput',employeeCrtls.sortTable)


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Add Employee' });
});
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Add Employee' });
});
router.get('/view', function(req, res, next) {
  res.render('view', { title: 'Employees' });
});
router.get('/delete', function(req, res, next) {
  var name = req.query.name
  res.render('delete', { title: 'Employee Delete',name });
});
router.get('/update', function(req, res, next) {
  var name = req.query.id
  res.render('update', { title: 'Employee Update' });
});

module.exports = router;
