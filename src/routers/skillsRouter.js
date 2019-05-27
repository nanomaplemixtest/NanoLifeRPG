const express = require('express')
const auth = require('../middleware/auth')
const Skill = require('../models/skill')
const User = require('../models/user')
const router = new express.Router()



router.post('/api/skills/create',auth, async (req,res)=>{

    try{
        const skill = new Skill({
            ...req.body,
            'owner':req.user._id
        })
        await skill.save()
        res.status(201).send({ skill:"added" })
    }catch(e){
        res.status(400).send(e)
    }

})

router.get('/api/skills/getSkills', auth ,async (req, res) => {

    try {
        const user = await User.findById(req.user._id)
        await user.populate('skills').execPopulate()     

        console.log(user.skills)
        res.status(200).send(user.skills)
           
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/api/skills/delete',auth,async(req,res)=>{
    await Skill.findOneAndDelete({_id: req.body._id}, ()=>{
        res.send({deleted:true})
    })
})








module.exports = router