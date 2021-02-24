const express = require('express')
const app = express()
var path = require('path')

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'))
})
app.get('/index', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'))
})
app.get('/fake-page', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'))
})
app.get('/todo',function(req, res){
    res.sendFile(path.join(__dirname + '/todo.json'))

})
app.get('/read-todo',function(req, res){
    res.sendFile(path.join(__dirname + '/read-todo.html'))
})
app.listen(3000, () => {
    console.log(`listening on port 3000!`)
  });