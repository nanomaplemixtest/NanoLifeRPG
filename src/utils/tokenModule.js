const jwt = require('jsonwebtoken')

const key = 'nanomou'

const verify = (token)=>{
    return jwt.verify(token, key)
}

const sign = (object)=>{
    return jwt.sign(object,key)
}


module.exports = {
    verify,
    sign
}