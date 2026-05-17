const express = require('express')
const { Getpostcomment, CreateComment, DeleteComment, EditComment } = require('../controller/commentcrud')
const { Authuser, VerifyAccess } = require('../controller/authuser')

const commentroute = express()

// All comment link to post id
commentroute.get('/blog/:postid/comment', Getpostcomment)

commentroute.post('/blog/:postid/', CreateComment)

commentroute.put('/blog/:postid/', EditComment)

commentroute.delete('/blog/:postid/:commentid', DeleteComment)


module.exports = commentroute