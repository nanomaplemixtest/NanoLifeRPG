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

router.post('/api/skills/addHours',auth, async (req,res)=>{
    
    try{
        const skill = await Skill.findOne({_id:req.body._id})
        skill.hours = (parseFloat(skill.hours) + parseFloat(req.body.hours)).toFixed(2)
        skillHoursCheck(skill)
        skill.save()

        res.status(201).send({ skill:"added" })
    }catch(e){
        res.status(400).send(e)
    }

})

router.patch('/api/skills/editHours',auth, async (req,res)=>{
    
    try{
        const skill = await Skill.findOne({_id:req.body._id})
        skill.hours = parseFloat(req.body.hours).toFixed(2)
        skillHoursCheck(skill)
        skill.save()

        res.status(201).send({ skill:"modified" })
    }catch(e){
        res.status(400).send(e)
    }

})

const skillHoursCheck = (skill)=>{
    if(skill.hours < 10){
        skill.maxHours = 10
        skill.level = 1
    }else if(skill.hours < 25){
        skill.maxHours = 25
        skill.level = 2
    }else if(skill.hours < 50){
        skill.maxHours = 50
        skill.level = 3
    }else if(skill.hours < 100){
        skill.maxHours = 100
        skill.level = 4
    }else if(skill.hours < 200){
        skill.maxHours = 200
        skill.level = 5
    }else if(skill.hours < 400){
        skill.maxHours = 400
        skill.level = 6
    }else if(skill.hours < 800){
        skill.maxHours = 800
        skill.level = 7
    }else if(skill.hours < 1500){
        skill.maxHours = 1500
        skill.level = 8
    }else if(skill.hours < 3000){
        skill.maxHours = 3000
        skill.level = 9
    }else if(skill.hours < 6000){
        skill.maxHours = 6000
        skill.level = 10
    }else if(skill.hours < 10000){
        skill.maxHours = 10000
        skill.level = 11
    }
}







module.exports = router