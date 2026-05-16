const express = require('express')
const { getblog, getspecificblog } = require('../controller/getblog')
const { Authuser, VerifyAccess } = require('../controller/authuser')
const { Createpost, Editpost, Deletepost, ReleasePost, VistBlogpanel } = require('../controller/crudblog')

const blogroute = express()

blogroute.get('/', getblog)
blogroute.get('/blog/:postid', getspecificblog)
blogroute.get('/blogpanel', Authuser, VerifyAccess, VistBlogpanel)

// Restful

blogroute.post('/blog', Authuser, VerifyAccess, Createpost)

blogroute.put('/blog/:postid', Authuser, VerifyAccess, Editpost)

blogroute.delete('/blog/:postid', Authuser, VerifyAccess, Deletepost)

blogroute.patch('/blog/:postid', Authuser, VerifyAccess, ReleasePost)


module.exports = blogroute