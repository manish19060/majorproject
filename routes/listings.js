const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");

//for multer
const multer  = require('multer')
const { storage }=require("../cloudConfig.js");
// const upload = multer({ dest: 'uploads/' });
const upload = multer({ storage });


//create route  //index route
router.route("/")
.post(isLoggedIn,upload.single("listing[image]"), validateListing,wrapAsync(listingController.createListing))  
.get(wrapAsync(listingController.index)) 


//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//show route  //update route  //delete route
router.route("/:id")
.get( wrapAsync( listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

//edit listings
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editListing));

module.exports=router;








// //#show route
// router.get("/:id", wrapAsync( listingController.showListing));

// //create route
// router.post("/",isLoggedIn,validateListing, wrapAsync(listingController.createListing));


// //update rout
// router.put("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(listingController.updateListing));

// //delete route
// router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));



//  #index route
// router.get("/", wrapAsync(async (req, res) => {
//     console.log(" route: router.get(/listings)");
//     let alllistings = await listing.find({});
//   //  console.log(alllistings);
//     res.render("listings/index.ejs", { alllistings });
// }));

// //new route
// router.get("/new",isLoggedIn, (req, res) => {
   
//     res.render("listings/new.ejs");
// });


// //#show route
// router.get("/:id", wrapAsync(async (req, res) => {
//     console.log("line :** 139 route: router.get(/listings/id)");

//     let { id } = req.params;
//     const listing1 = await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
//     if(!listing1){
//         req.flash("error"," listing you requested not exist !");
//         res.redirect("/listings");
//     }
//    console.log(listing1);
//     res.render("listings/show.ejs", { listing1 });
// }));

// //create route
// router.post("/",isLoggedIn,validateListing, wrapAsync(async (req, res, next) => {

//     console.log("route : router.post(/listings)");
//     let newlisting=new listing(req.body.listing);

//             newlisting.owner=req.user._id;
            
//     await newlisting.save();
//     req.flash("success"," new listing is created !");
//    // console.log(newlisting);
//     res.redirect("/listings");
// }));


// //edit listings
// router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
//     console.log("route : router.get(/listings/:id/edit)");
//     let { id } = req.params;
//     const listing2 = await listing.findById(id);
//     if(!listing2){
//         req.flash("error","  listing not exist !");
//         res.redirect("/listings");
//     }
//     console.log(listing2);
//     res.render("listings/edit.ejs", { listing2 });
// }));

// //update rout
// router.put("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(async (req, res) => {
//     console.log("line :****69");
//     let { id } = req.params;
//     await listing.findByIdAndUpdate(id, { ...req.body.listing});
//     req.flash("success","  listing is updated !");
//     res.redirect(`/listings/${id}`);

// }));


// //delete route
// router.delete("/:id",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
//     console.log("route : router.delete(/listings/:id)");
//     let { id } = req.params;
//     await listing.findByIdAndDelete(id);
//     console.log("done");
//     req.flash("success","  listing is deleted !");
//     res.redirect("/listings");
// }));

// module.exports=router;






