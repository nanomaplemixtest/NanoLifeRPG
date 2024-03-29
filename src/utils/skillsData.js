
const skillsData = async (user)=>{
    await user.populate('skills').execPopulate()  

    const count = user.skills.length
    let totalHours = 0
    let totalLevel = 0
    const data = user.skills
    
    data.forEach((skill) => {
        totalHours += skill.hours
        let hoursPercentage = Math.floor( (skill.hours / skill.maxHours) * 100)

        if(skill.hours >= 10000){
            hoursPercentage = 100
        }
        skill.hoursPercentage = hoursPercentage
        

        totalLevel += skill.level
    })

    return {
        data,
        count,
        totalHours,
        totalLevel
    }
}


module.exports = skillsData