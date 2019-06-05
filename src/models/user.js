const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const tokenModule = require('../utils/tokenModule')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    stats:{
        level:{
            type:Number,
            default:1
        },
        exp:{
            type:Number,
            default:0
        },
        maxExp:{
            type:Number,
            default:100
        },
        point:{
            type:Number,
            default:0
        },
        hp:{
            type:Number,
            default:1
        },
        int:{
            type:Number,
            default:1
        },
        str:{
            type:Number,
            default:1
        },
        gold:{
            type:Number,
            default:0
        },
        goldTotal:{
            type:Number,
            default:0
        },
        questsCompleted:{
            type:Number,
            default:0
        },
        skillHours:{
            type:Number,
            default:0
        }

    }
})

userSchema.virtual('quests', {
    ref: 'Quest',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('skills', {
    ref: 'Skill',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('achievements', {
    ref: 'Achievement',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('rewards', {
    ref: 'Reward',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = tokenModule.sign({ _id: user._id.toString() })

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// // Delete user tasks when user is removed
// userSchema.pre('remove', async function (next) {
//     const user = this
//     await Task.deleteMany({ owner: user._id })
//     next()
// })

const User = mongoose.model('User', userSchema)

module.exports = User