const jwt = require('jsonwebtoken');

function Authuser(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (!bearerHeader) {
        return res.sendStatus(403)
    }
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[0]

    req.token = bearerToken
    next()
}

function VerifyAccess(req,res) {
    console.log(req.token)
    jwt.verify(req.token , process.env.SECERT , (err,authdata) => {
        if (err) {
            res.sendStatus(403)
        } else {
            if (authdata.userstatus === 'owner') {
                res.json(authdata)
            } else {
                res.sendStatus(400)
            }
        }
    })
}

module.exports = {
    Authuser,
    VerifyAccess
}