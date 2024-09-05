const listing=require("../models/listing");
const Review=require("../models/review");

module.exports.postReview=async (req,res)=>{
    
    console.log(" line :*****  route in execution :-  /listings/:id/reviews");
    const Listing=await listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
     newReview.author=req.user._id;
     console.log(newReview);
    Listing.reviews.push(newReview);

    await newReview.save();
    await Listing.save();

    console.log("new review saved");
    req.flash("success"," new review is created !");
         // res.send("success");
   res.redirect(`/listings/${Listing._id}`);
};

module.exports.deleteReview=async(req,res)=>{
    console.log("route : app.delete (/listings/:id/rewiews/:reviewId)");
    let { id, reviewId }=req.params;
   await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success"," review is deleted !");
   res.redirect(`/listings/${id}`);

};