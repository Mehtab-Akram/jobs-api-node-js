const { StatusCodes } = require('http-status-codes')
const BadRequestError = require('../errors/bad-request')
const user = require('../models/User')
const bcrypt = require('bcryptjs')
const { UnauthenticatedError } = require('../errors')


const login = async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError("Invalid Credentials.")
    }
    const getUser = await user.findOne({ email })

    if (!getUser) {
        throw new UnauthenticatedError("Username or password is not correct.")
    }
    //compare password
    const isMatch = await getUser.comparePassword(password)
    if (!isMatch) {
        throw new UnauthenticatedError("Username or password is not correct.")
    }

    const token = getUser.generateJWT()
    res.status(StatusCodes.OK).json({ user: { email: getUser.email }, token })
}
const register = async (req, res) => {

    //All the hashing functionality has been moved to async mongoose middle ware written in userModel

    const savedUser = await user.create({ ...req.body });


    res.status(StatusCodes.CREATED).json({ user: { name: savedUser.name }, token: savedUser.generateJWT() });


}

module.exports = { login, register }