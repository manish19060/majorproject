const listing=require("./models/listing");
const Review=require("./models/review");

const ExpressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema }=require("./schema.js");



//validate review
module.exports.validateReview=(req,res,next)=>{
    console.log("validate review");
   // console.log("**"+req.body.review);
    let {error}=reviewSchema.validate(req.body);
    if(error)
        {
            let errmsg=error.details.map((el)=>el.message).join(",");
            console.log("**"+errmsg);
            throw new ExpressError(400,error);
        }else{
            next();
        }

};


module.exports.isLoggedIn=(req,res,next)=>{
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.flash("error","need to login");
       return res.redirect("/login");
    };
    next();
};


module.exports.isOwner=async(req,res,next)=>{
    let { id } = req.params;

    let chekListing=await listing.findById(id);
  
    if( !chekListing.owner._id.equals(res.locals.currUser._id)){
       req.flash("error","  you don't have the permission to update !");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing=(req,res,next)=>{
    console.log("validate listing");
    let {error}=listingSchema.validate(req.body);
    if(error)
        {
            let errmsg=error.details.map((el)=>el.message).join(",");

            throw new ExpressError(400,error);
        }else{
            next();
        }
};


module.exports.isAuthor=async(req,res,next)=>{
    let { id,reviewId } = req.params;

    let review=await Review.findById(reviewId);
  
    if( !review.author.equals(res.locals.currUser._id)){
       req.flash("error","  you don't have the permission to delete review !");
        return res.redirect(`/listings/${id}`);
    }
    next();
};