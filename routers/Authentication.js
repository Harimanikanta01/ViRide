const app=require("express")
const jwt=require("jsonwebtoken")
const express=require("express")
const router=express.Router()
const Accounts=require("../Database/accountschema")
const Valid=require("../middleware/userlogin")
router.post("/add",async(req,res)=>{
    const {name,image,password,year,section,role}=req.body
    if(name && password && year && section && role  ){
        const abc=new Accounts({name,image,password,year,section,role})
        try{
           abc.save()
            res.status(200).send("data sended to DB")
        }
        catch(error){
            console.log(error)
        }
       
   
    }
    else{
        res.status(400).send("data not recived yet")
    }
})
router.post("/authenticate", async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await Accounts.findOne({ name });

    if (!user) {
      return res.status(400).send("User Not Found");
    }

    if (user.password !== password) {
      return res.status(400).send("Invalid Password");
    }

    const secret_key = "Hari120";

    const token = jwt.sign(
      {
        name: user.name,
        year: user.year,
        section: user.section,
        image: user.image,
        role: user.role,
      },
      secret_key,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.post("/account",Valid,(req,res)=>{
const user=req.user
res.send(user)
})

router.get("/",(req,res)=>{
    res.send("working")
})

module.exports=router
