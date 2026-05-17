require('dotenv').config()
const express = require('express')
const sign_up = require('./router/signup')
const login = require('./router/login')
const blog = require('./router/blog')
const comment = require('./router/comment')

const app = express()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Router
app.use('/sign_up', sign_up)
app.use('/login', login)
app.use('/', blog)
app.use('/', comment)
// Start Server 

app.listen(process.env.PORT, () => {
    console.log("api is ready")
})