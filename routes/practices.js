//notice this file is plural for the router and connects to a schema that is single

//this is the tests router. Imports express. Sets name of router to router. Then has routes laid out. static first then dynamic as express reads top to bottom
const express = require('express')
const router = express.Router()
const Practice = require('../models/practiceSchema')

//this will be the route ...../practices/
router.get('/', async (req, res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ""){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const practices = await Practice.find(searchOptions)
        res.render('practices/index', {practices: practices, searchOptions: req.query})
    } catch {
        res.redirect('/')
    }  
})

//this will be the new route ...../practices/new
router.get('/new', (req, res) => {
    res.render('practices/new', {practice: new Practice()})
})

//this will create a new entry in DB
router.post('/', async (req, res) => {
    const practice = new Practice({
        //this pulls the name="name" from the input in _formFields.ejs
        name: req.body.name
    })
    try {
        //this happens if no error
        const newPractice = await practice.save()
        //this would happen heading to the new practice page
        //res.redirect(`practices/${newPractice.id}`)
        res.redirect('practices')
    } catch {
        //on error renders new page
        res.render('practices/new', {
        //this renders the const practice name in input on new.ejs
        practice: practice,
        errorMessage: 'Error creating practice'
        })
    }   
})

//this exports the router allowing the server.js file to grab it
module.exports = router