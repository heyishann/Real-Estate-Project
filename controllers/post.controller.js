const PostModel = require('../model/postmodel.js')
const mongoose = require('mongoose')


const getPosts = async(req,res)=>{
const query = req.query
// console.log(query);

const a = {}
if(query.city != "" && query.city != null && query.city != undefined){
    a.city = query.city;
}

if(query.type != "" && query.type != null && query.type != undefined){
    a.type = query.type;
}

if(query.property != "" && query.property != null && query.property != undefined){
    a.property = query.property;
}

if(query.bedroom != "" && query.bedroom != null){
    a.bedroom = query.bedroom;
}


// if(query.bedroom != "" || query.bedroom != null){
//     a.bedroom = query.bedroom;
// }
// if(query.minprice != "" || query.minprice != null){
//     a.price =query.price;
// }
// if(query.maxprice != "" || query.maxprice != null){
//     a.maxprice =query.maxprice;
// }
// console.log(a);
try{
    const posts = await PostModel.find(a);
    // console.log(posts);
    res.status(200).json(posts)
    
}catch(err){
    console.log(err);
    res.status(500).json({message:"Failed to get Posts!"})
    }
}


const getPost = async(req,res)=>{
const a = req.params.id
try{

    const post = await PostModel.aggregate([
        {
            "$match":{
                _id: new mongoose.Types.ObjectId(a)
            }
        },
        {
            "$lookup":{
                "from": 'users',
                "localField":'userID',
                "foreignField":'_id',
                "as": 'user'
            }
        },
        { $unwind: '$user'},
        
    ]);
    
    res.status(200).json(post[0])
    
}catch(err){
    console.log(err);
    res.status(500).json({message:"Failed to get Post!"})
    }
}


const addPost = async(req,res)=>{
const body = req.body
const tokenUserId = req.userId
try{
    const newPost = await PostModel.create({
        ...body,
        userID:tokenUserId,
        
    })
    res.status(200).json(newPost)
    
}catch(err){
    console.log(err);
    res.status(500).json({message:"Failed to add Post!"})
    }
}


const updatePost = async(req,res)=>{

try{
    res.status(200).json()
}catch(err){
    console.log(err);
    res.status(500).json({message:"Failed to update Post!"})
    }
}


const deletePost = async(req,res)=>{
const a = req.params.id;
const tokenUserId = req.userId;
try{
    const post = await PostModel.findOne({
        _id:a
    });

    if (post.userID != tokenUserId){
        return res.status(403).json({message:"Not Authorized"})
    }

    await PostModel.deleteOne({
        _id:a
    })
    res.status(200).json({message:"Post Deleted"})
}catch(err){
    console.log(err);
    res.status(500).json({message:"Failed to delete Post!"})
    }
}


module.exports = {
    getPosts,
    getPost,
    addPost,
    updatePost,
    deletePost
}