const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const token = await req.headers.token.split(' ')[1]
        
        if(token) {
            let decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET)
            req.userId = await decodedToken?.id
            req.userIsAdmin = await decodedToken?.isAdmin
        }
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error : `Invalid request!`})
    }
}