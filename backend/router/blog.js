const express = require('express')
const { getblog, getspecificblog, getallblogs } = require('../controller/getblog')
const { Authuser, VerifyAccess } = require('../controller/authuser')
const { Createpost, editPost, Deletepost, ReleasePost, VistBlogpanel } = require('../controller/crudblog')

const blogroute = express()

blogroute.get('/', getblog)
blogroute.get('/blog/:postid', getspecificblog)

//Visit blog 
blogroute.get('/blogpanel', Authuser, VerifyAccess, VistBlogpanel)

blogroute.get('/allblog', Authuser, VerifyAccess, getallblogs)

// Restful

blogroute.post('/blog', Authuser, VerifyAccess, Createpost)

blogroute.put('/blog/:postid', Authuser, VerifyAccess, editPost)

blogroute.delete('/blog/:postid', Authuser, VerifyAccess, Deletepost)

blogroute.patch('/blog/:postid', Authuser, VerifyAccess, ReleasePost)


module.exports = blogroute