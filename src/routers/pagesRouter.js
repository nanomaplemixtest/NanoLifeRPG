const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const renderHome = require('../utils/userData')

router.get('/home',auth,async (req, res) => {
    res.render('main', {
        title:'HOME',
        sidebar1:'active',
        isHome: true,
        userData: await renderHome(req.user)
    })
})

router.get('/quests',(req, res) => {
    res.render('main', {
        title:'Quests',
        sidebar2:'active',
        isQuests: true
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