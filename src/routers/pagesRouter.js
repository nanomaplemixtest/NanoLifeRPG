const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()

router.get('/home', (req, res) => {
    res.render('home', {
        title:'HOME',
        sidebar1:'active'
    })
})

router.get('/login', (req, res) => {
    res.render('login', {        
    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        
    })
})

router.get('/', (req, res) => {
    res.render('index', {
    })
})

router.get('/*', (req, res) => {
    
    res.redirect('/home')
})

module.exports = router