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


module.exports = {
    getblog,
    getspecificblog
}