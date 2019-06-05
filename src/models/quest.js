const mongoose = require('mongoose')

const Quest = mongoose.model('Quest', {
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
    completed: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    exp:{
        type: Number,
        required: true,
        trim: true
    },
    gold:{
        type: Number,
        required: true,
        trim: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Quest