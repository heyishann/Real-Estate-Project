const jwt = require('jsonwebtoken')

const shouldBeLoggedIn = async (req,res)=>{
    console.log(req.userId)

    res.status(200).json({message:"You are Authenticated"});
    }

const shouldBeAdmin = async (req,res)=>{
    const token = req.cookies.token

    if(!token) return res.status(401).json({message:"Not Authenticated"})
        jwt.verify(token,"I$han@007", async(err,payload)=>{
            if(err) return res.status(403).json({message:"Not A valid token"})
                if(!payload.isAdmin){
                    return res.status(403).json({message:"Not Authorized"})
                }
    })
    res.status(200).json({message:"You are Authenticated"});
    
}
module.exports={
    shouldBeLoggedIn,
    shouldBeAdmin
}