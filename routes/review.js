const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const listing = require("../models/listing.js");
const {validateReview,isLoggedIn,isAuthor}=require("../middleware.js");

const reviewController=require("../controllers/review.js");

// post route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.postReview));
// delete review route
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;




// // post route
// router.post("/",isLoggedIn,validateReview,wrapAsync(async (req,res)=>{
    
//     console.log(" line :*****  route in execution :-  /listings/:id/reviews");
//     const Listing=await listing.findById(req.params.id);
//     let newReview=new Review(req.body.review);
//      newReview.author=req.user._id;
//      console.log(newReview);
//     Listing.reviews.push(newReview);

//     await newReview.save();
//     await Listing.save();

//     console.log("new review saved");
//     req.flash("success"," new review is created !");
//          // res.send("success");
//    res.redirect(`/listings/${Listing._id}`);
// }));

// // delete review route
// router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(async(req,res)=>{
//     console.log("route : app.delete (/listings/:id/rewiews/:reviewId)");
//     let { id, reviewId }=req.params;
//    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
//     await Review.findByIdAndDelete(reviewId);
//     req.flash("success"," review is deleted !");
//    res.redirect(`/listings/${id}`);

// }));


// module.exports=router;

