const express = require('express')
const { Decrpytjwt } = require('../controller/decodejwt.js')

const app = express()

app.post('/decodejwt', Decrpytjwt)


module.exports = app

