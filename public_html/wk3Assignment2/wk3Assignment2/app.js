var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname+"/views"))


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
hbs.registerPartials(__dirname + '/views/partials');

//mongoose
mongoose.connect('mongodb://localhost:27017/Empl',{
  useNewUrlParser:true
}).then(function(){
  console.log("Connected to Empl")
}).catch(function(err){
  console.log(err)
})

require('./models/employee')
var Employee = mongoose.model('employee')

app.post('/saveEmployee', function(req, res){
  console.log("request made")
  console.log(req.body)
  new Employee(req.body).save().then(function(){
      console.log("Data saved")
      console.log(req.body)
      res.redirect('/view')
  })
})

app.get('/getData', function(req,res){
  Employee.find({}).then(function(employee){
      res.json({employee})
  })
})
app.get('/getSomeonesData', function(req,res){
  Employee.findById(req.query.id).then(function(employeeFind){
    console.log(req.query.id)
      res.json(employeeFind)
  })
})
app.post('/deleteEmployee', function(req, res){
  console.log('Employee deleted: ')
  console.log(req.body)
  console.log(req.body.dep)
  Employee.findByIdAndDelete(req.body._id).exec()
  res.redirect('/delete')
})

app.post('/updateEmployee', function(req, res){
  console.log('Employee updated: ')
  console.log(req.body._id)
  console.log(req.body.firstName)
  console.log(req.body.lastName)
  console.log(req.body.department)
  console.log(req.body.startDate)
  console.log(req.body.jobTitle)
  console.log(req.body.salary)
  Employee.findByIdAndUpdate(req.body._id, { $set: { firstName: req.body.firstName, lastName: req.body.lastName, department: req.body.department, startDate: req.body.startDate, jobTitle: req.body.jobTitle, salary: req.body.salary }}, function(){
    console.log('updated')
  })
  res.redirect('/view')
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
