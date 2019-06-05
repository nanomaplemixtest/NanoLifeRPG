
const rewardsData = async (user)=>{
    await user.populate('rewards').execPopulate()  

    return user.rewards
}

module.exports = rewardsData