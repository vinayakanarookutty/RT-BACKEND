var express=require('express')
var router=express.Router()
var mongoose=require('mongoose')
var bcrypt=require('bcrypt')
mongoose.connect("mongodb://localhost:27017/rtdatabase")
var userSchema=mongoose.Schema({
  name:String,
  userName:String,
  email:String,
  password:String,
  country:String
})
var UserModal=mongoose.model("user",userSchema)




  router.post("/login",async(req,res)=>{
    console.log(req.body)
   var user= await UserModal.findOne({email:req.body.email})
  
   if(user){
    bcrypt.compare(req.body.password,user.password).then((response)=>{
        if(response)
        {
          return res.status(200).send(user)
        }
        else{
          return res.status(404).json({
            message: "Login Failed",
          });
  
        }

    })

   }
   else
   {
    res.render('LoginPage',{status:"UserName is Wrong"})
   }    
   
  })
  router.post("/createResourcePerson",async(req,res)=>{
    if(req.body)
    {
      console.log(req.body)
      var password=await bcrypt.hash(req.body.password,10)
      var user= new UserModal({
          name:req.body.userName,
          userName:req.body.userName,
          email:req.body.email,
          password:password,
          country:req.body.country
      })
      user.save().then(()=>{
        return res.status(200)
        .json({
          message: "Login successful",
        });
      })

    }
    else
    {
      return res.status(404)
        .json({
          message: "Internal Server Error",
        });

    }
  

  })
module.exports=router