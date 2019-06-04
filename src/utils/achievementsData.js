
const achievementsData = async (user)=>{
    await user.populate('achievements').execPopulate()  

    const count = user.achievements.length

    const data = user.achievements
   
    return {
        data,
        count
    }
}


module.exports = achievementsData