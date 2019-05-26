const User = require('../models/user')

const questsData = async (user)=>{
    await user.populate('quests').execPopulate()   
    return user.quests
}


module.exports = questsData