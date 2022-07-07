const { StatusCodes } = require('http-status-codes')
const BadRequestError = require('../errors/bad-request')
const user = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')
require('dotenv').config()


const login = async (req, res) => {
    const { email, password } = req.body
    // if (!email || !password) {
    //     throw new BadRequestError('Please provide email and password.')
    // }
    const userData = await user.findOne({ email })
    if (!userData) {
        throw new UnauthenticatedError('User does not exist. Please verify username/password.')
    }
    if (! await userData.comparePasswords(password))
    {
        throw new UnauthenticatedError('Email or Password does not match. Please verify email/password.')
    }
    const token = userData.createToken()
    res.status(StatusCodes.OK).json({ user: { id: userData._id, name: userData.name }, token})

}
const register = async (req, res) => {
    
    const savedUser = await user.create({ ... req.body })

    const token = jwt.sign({name: savedUser.name,email: savedUser.email,password: savedUser.password }, process.env.JWT_SECRET)
    
    res.status(StatusCodes.CREATED).json({ savedUser , token});

}

module.exports = { login, register }