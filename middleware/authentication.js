const user = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')
require('dotenv').config()

const authenticationMiddleWare = (req, res, next) => {
    const auth = req.headers.authorization
    console.log(auth);
    if (!auth || !auth.startsWith('Bearer ')) {
        throw new UnauthenticatedError("You are not authorized to visit this route");        
    }

    const token = auth.split(' ')[1];
    console.log(auth);
    if (!token) {
        throw new UnauthenticatedError("You are not authorized to visit this route");
    }
    const userInfo = jwt.verify(token, process.env.JWT_SECRET)
        req.body.user = { Id: userInfo.id, name: userInfo.name }

    next()
}

module.exports = authenticationMiddleWare