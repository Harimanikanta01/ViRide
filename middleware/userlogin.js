const jwt = require("jsonwebtoken");
function Valid(req,res,next){
    const barrer=req.headers['authorization']
    if(barrer){
        const token=barrer.split(' ')[1]
         secreat_key="Hari120"
        jwt.verify(token,secreat_key,(err,decoded)=>{
            if(err){
                res.send(err)
            }
             
               req.user=decoded
                next()
            
             
        }
        
        
        
    
    )
       
    }
}
module.exports=Valid