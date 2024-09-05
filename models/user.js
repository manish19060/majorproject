const mongoose=require("mongoose");
const Schema=mongoose.Schema;

//require passport-local-mongoose
const passportLocalMongoose=require("passport-local-mongoose");

//create userSchema for database
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    }
});

//use plugin for automatically addition for username and password
//User.plugin(passportLocalMongoose);
userSchema.plugin(passportLocalMongoose);


// create model and export
module.exports=mongoose.model("User",userSchema);
