//this is the home router. Imports express. Sets name of router to router. Then has routes laid out. static first then dynamic as express reads top to bottom
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})


//this exports the router allowing the server.js file to grab it
module.exports = router