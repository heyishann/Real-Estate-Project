const userModel = require("../model/usermodel.js");
const postModel = require("../model/postmodel.js")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const getUsers = async (req,res)=>{
    try{
        const user = await userModel.find();
        res.status(200).json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to get users"})
    }
}
const getUser = async (req,res)=>{
    const a = req.params.id;
    try{
        const user = await userModel.findOne({
            _id:a
        });
        res.status(200).json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to get user"})
    }
}
const updateUser = async (req,res)=>{
    
    const a = req.params.id;
    const tokenUserId = req.userId
    
    const {password , ...inputs} = req.body;
    
    if(a !== tokenUserId){
        return res.status(403).json({message:"Not authorized"})
    }

    let updatePassword = null;
    try{

        if(password){
            updatePassword = await bcrypt.hash(password,10)
        }

        const updatedUser = await userModel.updateOne(
            {_id:a},
            {$set:{
                ...inputs,
                ...(updatePassword && {password:updatePassword}),
            },
        });

        // const {password: userPassword , ...rest} = updatedUser
        const userData = await userModel.findOne({_id:tokenUserId});
        const secret = "I$han@007"
        const token = jwt.sign({
            id:userData.id,
            isAdmin:false,
        },
        secret,
    )
    const data = {
        _id:userData._id,
        email:userData.email,
        username:userData.username,
        token:token
    }
        
        res.status(200).json(data)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to update user"})
    }
}
const deleteUser = async (req,res)=>{
    const a = req.params.id;
    const tokenUserId = req.userId
    if(a !== tokenUserId){
        return res.status(403).json({message:"Not authorized"})
    }
    try{
        await userModel.deleteOne(
            {_id:a}
        )
        res.status(200).json({message:"User Deleted"})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to delete user"})
    }
}

const profilePosts = async (req,res)=>{
    const a = req.params.id;
    const tokenUserId = req.userId
    
    try{
        const userPosts = await postModel.find({
            userID: tokenUserId
        })

        res.status(200).json({userPosts})
        
        // console.log(userPosts);
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Failed to get profile Posts!"})
    }
}


module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    profilePosts
}