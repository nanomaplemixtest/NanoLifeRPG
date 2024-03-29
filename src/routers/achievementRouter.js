const express = require('express')
const auth = require('../middleware/auth')
const Achievement = require('../models/achievement')
const dateFormat = require('dateformat')
const router = new express.Router()

router.post('/api/achievement/create', auth ,async (req, res) => {
    try {
        

        const achievement = new Achievement({
            ...req.body,
            "owner":req.user._id
        })
    
        
        await achievement.save()    
              
        res.status(201).send({ achievement:"created" })
           
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/api/achievement/delete',auth,async (req ,res) =>{
    await Achievement.findOneAndDelete({_id: req.body._id}, ()=>{
        res.send({deleted:true})
    })
})

router.patch('/api/achievement/unlock',auth,async(req,res)=>{
    try{

        const achievement = await Achievement.findOne({_id:req.body._id})
        achievement.unlocked = 'true'

        dateNow = Date.now()
        console.log(dateFormat(dateNow, "dd, mmmm , yyyy, h:MM:ss TT"))
        achievement.unlockedDate = dateFormat(dateNow, "dd mmm yyyy, h:MM TT");
        achievement.save()
             
        res.status(202).send({completed:true})
    }catch(e){
        res.status(400).send()
    }

})

module.exports = router
