const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
    try {
        const auth = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(auth, process.env.JWT_KEY)
        if(decode.adm != 1){
            throw {status: 401, message: 'Não autorizado.'}
        }
        req.user = decode
        next()
    } catch (error) {
        return res.status(500).send(error)
    }
}
