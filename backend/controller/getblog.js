const { prismacontroller } = require('../lib/prisma')

async function getblog(req,res) {
    const result = await prismacontroller.post.findMany({
        where : {
            poststatus : "publish"
        }
    })
    res.json({
        post : result
    })
}

module.exports = {
    getblog
}