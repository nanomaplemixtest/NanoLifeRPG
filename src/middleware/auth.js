const tokenModule = require('../utils/tokenModule')
const User = require('../models/user')


const auth = async (req, res, next) => {
    
    try {
        const token = req.cookies.authToken
        const decoded = tokenModule.verify(token)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
    
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.redirect('/login')        
    }
}

module.exports = auth