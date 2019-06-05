const express = require('express')
const auth = require('../middleware/auth')
const Reward = require('../models/reward')
const router = new express.Router()

router.post('/api/reward/create', auth ,async (req, res) => {
    try {
        

        const reward = new Reward({
            ...req.body,
            "owner":req.user._id
        })
    
        
        await reward.save()    
              
        res.status(201).send({ reward:"created" })
           
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/api/reward/delete',auth,async (req ,res) =>{
    await Reward.findOneAndDelete({_id: req.body._id}, ()=>{
        res.send({deleted:true})
    })
})

router.patch('/api/reward/buy',auth,async(req,res)=>{
    try{

        const reward = await Reward.findOne({_id:req.body._id})
        
        req.user.stats.gold -= reward.price
        if(req.user.stats.gold < 0) throw new Error()
        req.user.save()
        
        res.status(202).send({completed:true})
    }catch(e){
        res.status(400).send()
    }

})

module.exports = router
