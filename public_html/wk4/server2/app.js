//Example module in node
const { urlencoded } = require('express')
var express = require('express')
var hbs = require('hbs')

var app = express()

var randNum = require('./modules/randomNum')
//set up handlebars HBS view engine

app.set('view engine', 'hbs')

app.use(express.urlencoded({extended:false}))

hbs.registerHelper('ptag',function(num, msgToPassIn){
    var msg = " "
    for( var i=0;i<num;i++){
        msg += `<p>${msgToPassIn}${num}</p>`
    }
    return new hbs.handlebars.SafeString(msg)
})

app.get('/form', function(req, res){
    res.render('form.hbs')
})

app.post('/results', function(req, res){
    console.log(req.body.textNumber)
    res.render('results.hbs',{
        num: req.body.textNumber
    })
})

app.listen(3000, function(){
    console.log("Connected on port 3000")
});