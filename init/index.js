const initialdata=require("./data.js");
const mongoose=require("mongoose");

const listing=require("../models/listing.js");

const URI=process.env.URI;

main()
.then((res)=>{
 console.log("success");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}

const initdb=async()=>{
  await listing.deleteMany({});
  initialdata.data=initialdata.data.map((obj)=>({...obj,owner:"66c9e1ad11ec415644d396ce"}));
  await listing.insertMany(initialdata.data);
  console.log("db initialized");
};
initdb();