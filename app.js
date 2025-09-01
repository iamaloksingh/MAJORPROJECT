const express = require("express");
const app =express();
const mongoose = require("mongoose");
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});
app.get("/",(req,res)=>{
    res.send("hi iam root");
});
const ejs  =require("ejs");