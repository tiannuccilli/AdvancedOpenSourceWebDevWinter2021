if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
var express = require('express')
var app = express()
var bcrypt = require('bcrypt')
var password = require('passport')
var flash = require('express-flash')
var session = require('express-session')
var methodOverride = require('method-override')
var hbs = require('express-handlebars')
const passport = require('passport')
var users = []
var initPassport = require('./passport-config')
initPassport(passport, function(email){
    return users.find(async function(user){user.email === email})
},
    function(id){
        return users.find(async function(user){user.id === id})
    }

)

app.set('view engine','handlebars')
app.engine('handlebars', hbs({
    layoutsDir:__dirname+'/views/layouts'
}))


app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
    secret:process.env.SESSION_SECERT,
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkedAuthenticated, function(req, res){
    res.render('main', {layout: 'index', name:req.user.name})
})
app.get('/register',checkedNotAuthenticated, function(req, res){
    res.render('register', {layout: 'index'})
})
app.get('/login',checkedNotAuthenticated, function(req, res){
    res.render('login', {layout: 'index'})
})

// posts

app.post('/register',checkedNotAuthenticated, async function(req, res){
 try{
    var hashedPassword = await bcrypt.hash(req.body.password, 10)

    users.push({
        id:Date.now().toString(),
        name:req.body.name,
        email:req.body.email,
        password: hashedPassword
    })
    res.redirect('/login')
 }catch{
    res.redirect('/register')
 }
 console.log(users)
})

app.post('/login', checkedNotAuthenticated, passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}))
app.delete('/logout', function(req,res){
    req.logOut()
    res.redirect('/login')
})

function checkedAuthenticated(req,res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}
function checkedNotAuthenticated(req,res, next){
    if(req.isAuthenticated()){
        res.redirect('/')
    }
    return next()
}
app.listen(3000)             