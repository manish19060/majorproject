//for env
if(process.env.NODE_ENV !="production"){
   // console.log(process.env.NODE_ENV);
    require("dotenv").config();

}
//console.log(process.env.secret);

const express = require("express");
const app = express();

// //for review.js model
// const Review=require("./models/review.js");
// //for listing.js model
// const listing = require("./models/listing.js");

// for listing router
const listingsRouter=require("./routes/listings.js");
// review router
const reviewsRouter=require("./routes/review.js");
//for user router
const usersRouter=require("./routes/user.js");


// for authentication passport
const passport=require("passport");
//for authentication passport strategy :-username and password
const LocalStrategy=require("passport-local");
// require user model
const User=require("./models/user.js");

// // joi schema
// const { listingSchema,reviewSchema }=require("./schema.js");

// // for joi
// const Joi = require('joi');
// // for error handling
// const wrapAsync = require("./utils/wrapAsync.js");

//express Error
const ExpressError = require("./utils/ExpressError.js");

// express-session
const session=require("express-session");
//for online session store connect-mongo
const MongoStore = require('connect-mongo');


// flash
const flash=require("connect-flash");

const ejsMate = require("ejs-mate");
const methodOverride = require("method-override"); 
const path = require("path");
const mongoose = require("mongoose");

//const mongoURL='mongodb://127.0.0.1:27017/wonderlust';
const URI=process.env.URI;

main().then(()=>{
    console.log("connected to db");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(URI);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// for connect-mongo
const store=MongoStore.create({
    mongoUrl:URI,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
 });
 //for error in store
 store.on("error",()=>{
   console.log("error in mongo session store ",err);
 })
//session option
 const sessionOption={
        store,  
        secret:process.env.SECRET,
        resave:false,
        saveUninitialized:true,
        cookie:{
            expires:Date.now()+7*24*60*60*1000,
            maxAge:7*24*60*60*1000,
            httpOnly:true,
        },
        
 };

 


//  app.get("/", (req, res) => {
//     res.send("hi i am root");
// });


 //use session
 app.use(session(sessionOption));
// use flash
app.use(flash());

//moddleware for passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
 // use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for flash
app.use((req,res,next)=>{
   res.locals.success=req.flash("success");
   res.locals.error=req.flash("error");
   res.locals.currUser=req.user;
  // console.log(res.locals.success);
   next();
});
 

//demo user
// app.get("/demouser",async(req,res)=>{
//     let fakeuser=new User({
//         email:"manish@gmail.com",
//         username:"manish123"

//     });
//     const reguser=await User.register(fakeuser,"password123");
//     res.send(reguser);
// })

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",usersRouter);




// for all calls


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found"));
});

// error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something wrong" } = err;
  //console.log("  : app.use((err, req, res, next)"+err);
    res.render("listings/error.ejs", { message });

    //res.status(statusCode).send(message);

});


app.listen(8080, () => {
    console.log("listening to port 8080...");
});