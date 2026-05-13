require('dotenv').config()
const express = require('express')
const sign_up = require('./router/signup')

const app = express()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Router
app.use('/sign_up' , sign_up)


// Start Server 

app.listen(process.env.PORT , () => {
    console.log("api is ready")
})