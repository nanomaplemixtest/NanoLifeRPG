const express = require('express')
const auth = require('../middleware/auth')
const Quest = require('../models/quest')
const User = require('../models/user')
const router = new express.Router()

router.post('/quests/create', auth ,async (req, res) => {

    const quest = new Quest(req.body)
    try {
        await quest.save()             
        res.status(201).send({ quest })
           
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/quests/getQuests', auth ,async (req, res) => {

    try {
        const user = await User.findById(req.user._id)
        await user.populate('quests').execPopulate()     

        res.status(200).send(user.quests)
           
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router