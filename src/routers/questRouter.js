const express = require('express')
const auth = require('../middleware/auth')
const Quest = require('../models/quest')
const User = require('../models/user')
const router = new express.Router()

router.post('/api/quests/create', auth ,async (req, res) => {
    try {
        

        let multiper = 0
        switch(req.body.type) {
            case "Easy":
                multiper = 1
              break;
            case "Normal":
                multiper = 3
              break;
            case "Hard":
                multiper = 5
            break;  
          }

        let exp = multiper * 10
        let coin = multiper

        const quest = new Quest({
            ...req.body,
            "exp": exp,
            "coin": coin,
            "owner":req.user._id})
    
        
        await quest.save()    
              
        res.status(201).send({ quest:"created" })
           
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/api/quests/getQuests', auth ,async (req, res) => {

    try {
        const user = await User.findById(req.user._id)
        await user.populate('quests').execPopulate()     

        res.status(200).send(user.quests)
           
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/api/quests/delete',auth,async (req ,res) =>{
    Quest.findOneAndDelete({_id: req.body._id}, ()=>{
        res.send({deleted:true})
    })
})


module.exports = router