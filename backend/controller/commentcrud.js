const { text } = require('express')
const { prismacontroller } = require('../lib/prisma.js')

async function Getpostcomment(req, res) {
    const { commentid } = req.params
    const result = await prismacontroller.comment.findMany({
        where: {
            postId: commentid
        }
    })
    res.json({
        data: result
    })
}


async function CreateComment(req, res) {
    const reqbody = req.body
    const result = await prismacontroller.comment.create({
        data: {
            postId: reqbody.blogid,
            text: reqbody.text,
            author_username: reqbody.username
        }
    })
    res.json({
        data: result
    })
}

async function DeleteComment(req, res) {
    const { commentid } = req.params
    const result = await prismacontroller.comment.delete({
        where: {
            postId: reqbody.postid
        }
    })
    res.json({
        data: {
            result
        }
    })
}

async function EditComment(req, res) {
    const { commentid } = req.params
    const result = await prismacontroller.comment.update({
        where: {
            commentid: commentid
        },
        data: {
            text: req.body.text
        }
    })
}


module.exports = {
    CreateComment, DeleteComment, EditComment, Getpostcomment
}