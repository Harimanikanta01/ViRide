const mongoose=require("mongoose")
require('dotenv').config();

const url=process.env.url
const db=()=>{
try{
    mongoose.connect(url)
    console.log("db connected")
}
catch(error){
    console.log(error)
}
}

module.exports=db