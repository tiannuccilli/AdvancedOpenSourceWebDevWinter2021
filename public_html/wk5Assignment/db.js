var mongoose = require('mongoose')
var debug = require('debug')('Empl:mongo')
var dbURI = 'mongodb://localhost:27017/Empl'

if(process.env.NODE_ENV === 'production'){
    dbURI = process.env.MONGOLAB_URI
}

mongoose.connect(dbURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.Promise = Promise

mongoose.connection.on('connected', function(){
    debug("Mongoose connected to " + dbURI)
})

mongoose.connection.on('error', function(err){
    debug('Mongoose connection error' + err)
    process.exit(0)
})

mongoose.connection.on('disconnected', function(){
    debug('Mongoose disconnected')
    
})

process.on('exit', function(code){
    debug("About to exit with code: ", code)
})