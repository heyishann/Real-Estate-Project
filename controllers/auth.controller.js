const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userModel = require("../model/usermodel.js");

const register = async (req,res)=>{
    const { username, email, password}=req.body;
    try{
    const hashedPassword = await bcrypt.hash(password, 10);
    

    const newUser = await userModel.create({
        username ,
        email ,
        password:hashedPassword
    })
    console.log(newUser);
    res.status(201).json({message:"User created successfully!"});
}catch(err){

    res.status(500).json({message:"Username has been taken"});
}
};


const login = async(req,res)=>{
    const a = req.body.username;
    const b = req.body.password;

    try{
        const user = await userModel.findOne({
            username:a,
            
        })
        if(!user) return res.status(401).json({message:"Invalid Credentials"})
        
            const isMatch = await bcrypt.compare(b,user.password);
        if(!isMatch) return res.status(401).json({message:"Invalid Credentials"}) 
        
            const age = 1000*60*60*24*7;
        const secret = "I$han@007"
        const token = jwt.sign({
            id:user.id,
            isAdmin:false,
        },
        secret,
        {expiresIn:age}
        )

        const {b:userPassword, ...userInfo} = user
        
        let data = {
            _id:user._id,
            email:user.email,
            username:user.username,
            token:token
        }
        res.status(200).json(data)
        
    }catch(err){
        console.log(err)
            res.status(500).json({message:"Failed to login"})
    }
};

const logout = async(req,res)=>{
    res.clearCookie("token").status(200).json({message:"Logout Successful!"});
}



module.exports = {
    register,
    login,
    logout,
    
}