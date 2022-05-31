//this loads the env file in dev enviroment
if(process.env.NODE_ENV !== 'production'){
    const env = require('dotenv')
    env.config()
}
//dependencies
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

//this is the way a router is imported to server
const indexRouter = require('./routes/index')
const practiceRouter = require('./routes/practices')


//view engine and use
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
//this sets static file to public folder
app.use(express.static('public'))
//body parser
app.use(bodyParser.urlencoded({limit: '10mb', extended:false}))

//database connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to db'))

//this grabs the index router from the export in index.js and practices.js
app.use('/', indexRouter)
app.use('/practices', practiceRouter)


//listening on provided port or port 5000
app.listen(process.env.PORT || 5000)