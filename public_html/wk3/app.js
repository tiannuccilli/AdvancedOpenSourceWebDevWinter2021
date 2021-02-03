var express = require('express')
var mongoose = require('mongoose')
var app = express()
var path = require('path')
var bodyparser = require('body-parser')

//mongoose middleware
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())

//connect mongo using mongoose
app.use('/connect', require('./routes/connect'))

//load db templates
require('./models/food')
//var ref to model
var Food = mongoose.model('food')

//basic data entry mongoose
/*var Food = mongoose.model('Food',{nameOfFood:String})
var food = new Food({nameOfFood:"Pizza"})
food.save().then(function(){
    console.log("food entry saved")
})*/

app.post('/saveFoodEntry', function(req, res){
    console.log("request made")
    console.log(req.body)
    new Food(req.body).save().then(function(){
        console.log("Data saved")
        res.redirect('foodList.html')
    })
})

app.get('/getData', function(req,res){
    Food.find({}).then(function(food){
        res.json({food})
    })
})

app.post('/deleteFood', function(req, res){
    console.log('food deleted: ', req.body._id)
    Food.findByIdAndDelete(req.body._id).exec()
    res.redirect('./foodList.html')
})
//sets up static folder
app.use(express.static(__dirname+"/views"))
app.listen(3000, function(){
    console.log("Connected on Port 3000")
});