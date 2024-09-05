
const User=require("../models/user");


module.exports.signUpForm=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signUp=async(req,res)=>{
    try{
     let {username,email,password}=req.body;
     const newuser= new User({email,username});
      const reguser=await User.register(newuser,password);
      console.log(reguser);
 
      //for automatically login
      req.login(reguser, (err)=> {
         if (err) {
              return next(err);
          }
          req.flash("success","welcome to wonderlust");
          res.redirect("/listings");
       });
       
    }catch(err){
     req.flash("error",err.message);
     res.redirect("/signup");
    }
 };

 module.exports.loginForm=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.logIn=async(req,res)=>{
    req.flash("success","logged In");
   res.redirect("/listings");
};

module.exports.logOut=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are loggedOut");
        res.redirect("/listings");
    });
   
};