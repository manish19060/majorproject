const express=require("express");
const router=express.Router({mergeParams:true});
//require user model
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
//require passport
const passport=require("passport");

const userController=require("../controllers/user.js");

// for signup form
router.get("/signup",userController.signUpForm);
//signup
router.post("/signup",wrapAsync(userController.signUp));
//login form
router.get("/login",userController.loginForm);
//login
router.post("/login",passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),userController.logIn);
//logout
router.get("/logout",userController.logOut);
module.exports=router;




// //form for signup
// router.get("/signup",(req,res)=>{
//     res.render("users/signup.ejs");
// });


// router.post("/signup",wrapAsync(async(req,res)=>{
//    try{
//     let {username,email,password}=req.body;
//     const newuser= new User({email,username});
//      const reguser=await User.register(newuser,password);
//      console.log(reguser);

//      //for automatically login
//      req.login(reguser, (err)=> {
//         if (err) {
//              return next(err);
//          }
//          req.flash("success","welcome to wonderlust");
//          res.redirect("/listings");
//       });
      
//    }catch(err){
//     req.flash("error",err.message);
//     res.redirect("/signup");
//    }
// }));

// router.get("/login",(req,res)=>{
//     res.render("users/login.ejs");
// });

// router.post("/login",passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),async(req,res)=>{
//     req.flash("success","logged In");
//    res.redirect("/listings");
// });

// router.get("/logout",(req,res,next)=>{
//     req.logout((err)=>{
//         if(err){
//            return next(err);
//         }
//         req.flash("success","you are loggedOut");
//         res.redirect("/listings");
//     });
   
// });
// module.exports=router;