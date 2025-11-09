const mongoose=require("mongoose")
const db=()=>{
try{
    mongoose.connect("mongodb+srv://punugulahari1:12345@cluster0.fmy2e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("db connected")
}
catch(error){
    console.log(error)
}
}

module.exports=db