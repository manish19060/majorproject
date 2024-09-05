const mongoose = require("mongoose");
//const Review=require("Review");
// 1.create schema
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        url:String,
        filename:String
    //     type: String,
    //     //when no option of img is given
    //     default:"https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yODUtcC5wbmc.png",
    //     //when option is given but it is empty=""
    //     set: (v) => v === "" ? "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yODUtcC5wbmc.png" : v,
     },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review",
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
});

//listingSchema.post();
// 2. create model
const listing = new mongoose.model("listing", listingSchema);

// 3.export model to app.js
module.exports = listing;