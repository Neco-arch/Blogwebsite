const express = require('express')
const { Authuser } = require('../controller/authuser')
const { CreateUser } = require('../controller/signupuser')

const sign_uprouter = express()

sign_uprouter.get('/' , (req,res) => {
    res.json("Loaded Succesfully")
})

sign_uprouter.post('/' , CreateUser)

module.exports = sign_uprouter
