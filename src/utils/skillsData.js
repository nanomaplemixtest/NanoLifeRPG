
const skillsData = async (user)=>{
    await user.populate('skills').execPopulate()  

    const count = user.skills.length
    let totalHours = 0

    const data = user.skills
   
    data.forEach((skill) => {
        totalHours += skill.hours
    })

    return {
        data,
        count,
        totalHours
    }
}


module.exports = skillsData