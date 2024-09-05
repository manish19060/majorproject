const listing=require("../models/listing");

module.exports.index=async (req, res) => {
    console.log(" route: router.get(/listings)");
    let alllistings = await listing.find({});
  //  console.log(alllistings);
    res.render("listings/index.ejs", { alllistings });
};

module.exports.renderNewForm=(req, res) => {
   
    res.render("listings/new.ejs");
};

module.exports.showListing=async (req, res) => {
    console.log("line :** 139 route: router.get(/listings/id)");

    let { id } = req.params;
    const listing1 = await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing1){
        req.flash("error"," listing you requested not exist !");
        res.redirect("/listings");
    }
   console.log(listing1);
    res.render("listings/show.ejs", { listing1 });
};

module.exports.createListing=async (req, res, next) => {
    
    let url=req.file.path;
    let filename=req.file.filename;
    console.log("route : router.post(/listings)");
    let newlisting=new listing(req.body.listing);

            newlisting.owner=req.user._id;
            newlisting.image={url,filename};
    await newlisting.save();
    req.flash("success"," new listing is created !");
   // console.log(newlisting);
    res.redirect("/listings");
};

module.exports.editListing=async (req, res) => {
    console.log("route : router.get(/listings/:id/edit)");
    let { id } = req.params;
    const listing2 = await listing.findById(id);
    if(!listing2){
        req.flash("error","  listing not exist !");
        res.redirect("/listings");
    }
    let originalimageurl=listing2.image.url;
    originalimageurl=originalimageurl.replace("/upload","/upload/h_300,w_250");
    console.log(listing2);
    res.render("listings/edit.ejs", { listing2,originalimageurl });
};

module.exports.updateListing=async (req, res) => {

   
    console.log("line :****69");
    let { id } = req.params;
    let Listing=await listing.findByIdAndUpdate(id, { ...req.body.listing}); //work for all 

    //for image
    if( typeof req.file !=="undefined"){
        let url=req.file.path;
    let filename=req.file.filename;
      Listing.image={ url,filename};
      await Listing.save();
    }
   
    req.flash("success","  listing is updated !");
    res.redirect(`/listings/${id}`);

};

module.exports.deleteListing=async (req, res) => {
    console.log("route : router.delete(/listings/:id)");
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    console.log("done");
    req.flash("success","  listing is deleted !");
    res.redirect("/listings");
};