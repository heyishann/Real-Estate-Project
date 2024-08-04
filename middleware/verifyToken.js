const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const token = req.headers.authorization
    
    if(!token) return res.status(401).json({message:"Not Authenticated"})
        jwt.verify(token,"I$han@007", async(err,payload)=>{
            if(err) return res.status(403).json({message:"Not A valid token"})
            req.userId = payload.id
            next()

    })
    }
module.exports= verifyToken;