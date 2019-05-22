const express = require('express')
const auth = require('../middleware/auth')
const Quest = require('../models/quest')
const User = require('../models/user')
const router = new express.Router()

router.post('/stats/upgrade', auth ,async (req, res) => {

    try {
        if(req.user.stats.point > 0){
            if(req.body.type == "HP"){
                req.user.stats.hp++    
                req.user.stats.point--      
            }
            if(req.body.type == "INT"){
                req.user.stats.int++     
                req.user.stats.point--      
            }
            if(req.body.type == "STR"){
                req.user.stats.str++  
                req.user.stats.point--          
            }
        }

        await req.user.save()         
        res.status(201).send({})
           
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router