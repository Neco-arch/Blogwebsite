const express = require('express')
const { loginuser } = require('../controller/loginuser')

const loginroute = express()



loginroute.get('/' , (req,res) => {
    res.statusCode(400)
})

loginroute.post('/' , loginuser)


module.exports = loginroute