const express = require('express')
const { getblog } = require('../controller/getblog')
const { Authuser , VerifyAccess } = require('../controller/authuser')
const {Createpost , Editpost , Deletepost , ReleasePost , VistBlogpanel} = require('../controller/crudblog')

const blogroute = express()

blogroute.get('/' , getblog)

blogroute.get('/blogpanel' , Authuser , VerifyAccess ,VistBlogpanel)

blogroute.post('/Createblog' , Authuser , VerifyAccess , Createpost)

blogroute.post('/Editblog' , Authuser ,  VerifyAccess, Editpost)

blogroute.post('/Deleteblog' , Authuser , VerifyAccess, Deletepost)

blogroute.post ('/Releaseblog' , Authuser , VerifyAccess, ReleasePost)


module.exports = blogroute