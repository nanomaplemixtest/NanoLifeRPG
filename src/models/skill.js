const mongoose = require('mongoose')

const Skill = mongoose.model('Skill', {
    title:{
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    hours: {
        type: Number,
        default: 0
    },
    maxHours: {
        type: Number,
        default: 10
    },
    level: {
        type: Number,
        default: 1
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Skill