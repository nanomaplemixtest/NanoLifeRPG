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
        let gold = multiper

        const quest = new Quest({
            ...req.body,
            "exp": exp,
            "gold": gold,
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
    await Quest.findOneAndDelete({_id: req.body._id}, ()=>{
        res.send({deleted:true})
    })
})

router.patch('/api/quests/complete',auth,async(req,res)=>{
    try{

        const quest = await Quest.findOne({_id:req.body._id})
        quest.completed = 'true'
        quest.save()
        
        //Level Up
        req.user.stats.exp += quest.exp
        while(req.user.stats.exp >= req.user.stats.maxExp){
            req.user.stats.exp -= req.user.stats.maxExp
            req.user.stats.level++
            req.user.stats.point++
            req.user.stats.maxExp *= 1.05
        }
        req.user.stats.exp = req.user.stats.exp.toFixed()
        req.user.stats.gold += quest.gold
        req.user.stats.questsCompleted++
        req.user.stats.goldTotal += quest.gold

        req.user.save()
        res.status(202).send({completed:true})
    }catch(e){
        res.status(400).send()
    }

})

router.patch('/api/quests/redo',auth,async(req,res)=>{
    try{

        const quest = await Quest.findOne({_id:req.body._id})
        quest.completed = 'false'
        quest.save()
        
        res.status(202).send({redo:true})
    }catch(e){
        res.status(400).send()
    }
})

module.exports = router