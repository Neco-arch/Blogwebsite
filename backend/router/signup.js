const express = require('express')
const { Authuser } = require('../controller/authuser')
const sign_uprouter = express()

sign_uprouter.get('/' , (req,res) => {
    res.json({
        massage : "Sign up Working"
    })
})

sign_uprouter.post('/' , (req,res) => {
    
})

module.exports = sign_uprouter
