require('dotenv').config()
const { prismacontroller } = require('../lib/prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function loginuser(req, res) {
    const reqbody = req.body

    const user = await prismacontroller.user.findUnique({
        where: {
            email: reqbody.email,
            username: reqbody.username
        }
    })

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }

    const matched = bcrypt.compare(user.password, reqbody.password)
    if (!matched) {
        return res.status(401).json({
            massage: "Wrong password"
        })
    }

    jwt.sign({ userid: user.Userid, user: user.username, password: user.password, userstatus: user.user_status }, process.env.SECERT, { expiresIn: '1d' }, (error, token) => {
        res.json({
            token
        })
    })
}


module.exports = {
    loginuser
}