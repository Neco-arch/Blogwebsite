const { PostStatus } = require('../generated/prisma')
const { prismacontroller } = require('../lib/prisma')

async function getblog(req, res) {
    const result = await prismacontroller.post.findMany({
        where: {
            poststatus: "publish"
        }
    })
    res.json({
        post: result
    })
}

async function getspecificblog(req, res) {
    const result = await prismacontroller.post.findUnique({
        where: {
            postid: parseInt(req.params.postid)
        }
    })
    res.json(result)
}

async function getallblogs(req, res) {
    const result = await prismacontroller.post.findMany();

    console.log(result);
    res.json(result);
}


module.exports = {
    getblog,
    getspecificblog,
    getallblogs
}