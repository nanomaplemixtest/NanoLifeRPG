const mongoose = require('mongoose')

const achievement = mongoose.model('Achievement', {
    title:{
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default:'None'
    },
    unlocked: {
        type: Boolean,
        default: false
    },
    unlockedDate:{
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = achievement