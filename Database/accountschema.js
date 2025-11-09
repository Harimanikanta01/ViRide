const mongoose=require("mongoose")
const accounts=new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    image:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMYABlzKxG_1mMfYwg3MCS8QGGCFlspF1iIw&s"
    },
    password:{
        required:true,
        type:String
    },
    year:{
        required:true,
        type:String
    },
    section:{
        required:true,
        type:String
    },
    role:{
require:true,
type: String,
    enum: ["user", "driver"],  
    default: "user",           
   

    }

})
module.exports=mongoose.model("ViRideaccounts",accounts)