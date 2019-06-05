const mongoose = require('mongoose')

const reward = mongoose.model('Reward', {
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
    price:{
      type:Number,
      require:true,
      trim:true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = reward