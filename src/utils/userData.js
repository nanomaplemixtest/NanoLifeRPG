const User = require('../models/user')

const getHomeData = async (user)=>{
    const username = user.username

    //Level
    const level = user.stats.level   
    const exp = user.stats.exp
    const maxExp = Math.floor(user.stats.maxExp)
    const levelBar = Math.floor((exp / maxExp ) * 100)

    //Stats and Stats Level
    const point = user.stats.point
    const hpLevel = user.stats.hp
    const intLevel = user.stats.int
    const strLevel = user.stats.str
    const hp =  hpLevel * 100
    const mana = intLevel * 100
    const atk = strLevel * 100

    //Quests
    const questsCount = await getQuestCount(user)
    const questsCompleted = user.stats.questsCompleted

    //Skills

    //GOLD
    const gold = user.stats.gold
    const goldTotal = user.stats.goldTotal

    const data = {
        username,
        level,
        exp,
        maxExp,
        levelBar,
        point,
        hpLevel,
        intLevel,
        strLevel,
        hp,
        mana,
        atk,
        questsCount,
        questsCompleted,
        gold,
        goldTotal
    }
    return data
}

const getQuestCount = async (user)=>{
    try {
        await user.populate('quests').execPopulate()  

        const count = user.quests.filter((quest) => {
            return quest.completed == false
        })

        return count.length        
    } catch (e) {
        return 0
    }
}


module.exports = getHomeData