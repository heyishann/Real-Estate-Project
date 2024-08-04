const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const cookieParser = require('cookie-parser')
const app = express();;


const  postRoute = require('./routes/post.route.js');
const authRoute = require('./routes/auth.route.js')
const testRoute = require('./routes/test.route.js')
const userRoute = require('./routes/user.route.js')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173' , credentials:true}))


main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/RealEstate');
}

app.use("/api/post/",postRoute)
app.use("/api/auth/",authRoute);
app.use("/api/test/",testRoute);
app.use("/api/users/",userRoute)


app.listen(3000,()=>{
    console.log('Server running on port 3000!');
})