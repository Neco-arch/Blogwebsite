require('dotenv').config()
const jwt = require('jsonwebtoken')

function Decrpytjwt(req, res) {
    const token = req.body.token;

    try {
        const decoded = jwt.decode(token, process.env.SECRET);
        console.log(decoded)
        res.json({ decoded });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
}


module.exports = { Decrpytjwt }