const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const userData = require('../utils/userData')
const questsData = require('../utils/questsData')
const skillsData = require('../utils/skillsData')

router.get('/home',auth,async (req, res) => {
    res.render('main', {
        pageTitle:'Home',
        sidebar1:'active',
        isHome: true,
        userData: await userData(req.user),
        skillsData: await skillsData(req.user)
    })
})

router.get('/quests',auth,async (req, res) => {

    res.render('main', {
        pageTitle:'Quests',
        sidebar2:'active',
        isQuests: true,
        userData: await userData(req.user),
        questsData: await questsData(req.user)
    })
})

router.get('/skills',auth,async (req, res) => {

    res.render('main', {
        pageTitle:'Skills',
        sidebar3:'active',
        isSkills: true,
        userData: await userData(req.user),
        skillsData: await skillsData(req.user)
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