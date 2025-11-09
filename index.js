const express=require("express")
const mongoose=require("mongoose")
require('dotenv').config();
const cors=require("cors")
const app=express()
app.use(cors("*"))
const authentication=require("./routers/Authentication")
const router1=require("./routers/mainlogic")
app.use(express.json())
const dbconnection=require("./controllers/dbconnect")
const port =process.env.port ||9000
dbconnection()
app.use("/viride/",authentication)
app.use("/viride/",router1)
app.listen(port,()=>{
    console.log("server running")
})