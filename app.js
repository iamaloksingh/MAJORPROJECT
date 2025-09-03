const express  = require("express");
const app = express ();
const mongoose = require("mongoose");
const  Listing = require("../models/listing.js");
const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log('connected to DB')
}).catch((err)=>{
    console.log("err");
})
async function main(){
    await mongoose.connect(MONGO_URL)
}

app.get("/",(req,res)=>{
    res.send("i am root");
});
app.get("/testListing", async(req,res)=>{
    let  sampleLisitng =new Listing({
        title :"My New Villa",
        description :"ByThe Beach",
        price :1200,
        location : "Calangute, Goa",
        country :"india"
    });
    await sampleLisitng.save()
    console.log("sample was saved");
    res.send("successful testing");
});

app.listen(8080,()=>{
    console.log("sever is listening on port 8080");
});
