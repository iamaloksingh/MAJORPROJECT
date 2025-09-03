const mongoose =require("mongoose");
const intiData =  require("./data.js");
const Listing = require ("../models/Listing.js");

const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log('connected to DB')
})
.catch((err)=>{
    console.log("err");
})
async function main(){
    await mongoose.connect(MONGO_URL)
}
const initDB = async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(intiData.data);
    console.log("data was initialized")
}
initDB();