const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
    try {
        const auth = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(auth, process.env.JWT_KEY)
        req.user = decode
        next()
    } catch (error) {
        return res.status(401).send({msg:'Falha na autenticação.'})
    }
}
