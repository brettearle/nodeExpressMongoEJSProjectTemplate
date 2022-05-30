//this loads the env file in dev enviroment
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').load()
}
//dependencies
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
//this is the way a router is imported to server
const indexRouter = require('./routes/index')
//view engine and use
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
//database connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to db'))
//this grabs the index router from the export in index.js
app.use('/', indexRouter)


//listening on provided port or port 5000
app.listen(process.env.PORT || 5000)