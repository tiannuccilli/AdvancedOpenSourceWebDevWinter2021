var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/favoriteFood',{
    useNewUrlParser:true
}).then(function(){
    console.log("connected to database");
}).catch(function(err){
    console.log(err);
})

module.exports = router