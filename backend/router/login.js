const express = require('express')
const { loginuser } = require('../controller/loginuser')

const loginroute = express()



loginroute.get('/' , (req,res) => {
    res.json(
        {
            massage : "Working"
        }
    )
})

loginroute.post('/' , loginuser)


module.exports = loginroute