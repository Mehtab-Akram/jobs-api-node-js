const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, `Name is required.`],
        minlength: 3,
        maxlength: 50

    },
    email: {
        type: String,
        required: [true, `Email is required.`],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            `Please provide a valid email.`],
        unique: true,//Creates a unique index. This is not a validator. 
    },
    password: {
        type: String,
        required: [true, `Password is required.`],
        minlength: 3,
    }
})
//Mongoose middleware
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
// Mongoose instance methods
userSchema.methods.createToken = function () {
    return jwt.sign({ id: this._id, name: this.name ,email:this.email,password:this.password},process.env.JWT_SECRET,{expiresIn:'30d'})
}
userSchema.methods.comparePasswords = async function (providedPassword) {
    const isMatch = await bcrypt.compare(providedPassword, this.password)
    return isMatch;
}
module.exports = mongoose.model('User',userSchema)