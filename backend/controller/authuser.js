const jwt = require('jsonwebtoken');

function Authuser(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (!bearerHeader) {
        return res.sendStatus(403)
    }
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]

    req.token = bearerToken
    next()
}

function VerifyAccess(req, res, next) {
    jwt.verify(req.token, process.env.SECERT, (err, authdata) => {
        if (err) {
            res.sendStatus(403)
        } else {
            if (authdata.userstatus === 'owner') {
                next()
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