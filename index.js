const express=require("express")
const mongoose=require("mongoose")
const app=express()
const authentication=require("./routers/Authentication")
const router1=require("./routers/mainlogic")
app.use(express.json())
const dbconnection=require("./controllers/dbconnect")

dbconnection()
app.use("/viride/",authentication)
app.use("/viride/",router1)
app.listen(9000,()=>{
    console.log("server running")
})