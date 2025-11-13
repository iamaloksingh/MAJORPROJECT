const express = require ("express");
const app = express();
const mongoose = require ("mongoose");
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({extended:true}));
const methodOverride = require("method-override");
app.use(express.json()); 
app.use(methodOverride("_method"));

const ejsMate =require("ejs-mate");
app.use(express.static(path.join(__dirname, "public")));

const session = require("express-session")
const flash  =require("connect-flash");

const passport = require ("passport");
const LocalStrategy = require("passport-local");
const User = require ("./models/user.js")

const listingRouter= require("./routes/listing.js");
const reviewRouter= require("./routes/review.js");
const userRouter= require("./routes/user.js");

const expressError = require("./utils/expressError.js");
const { date } = require("joi");
const user = require("./models/user.js");

const  MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
} 
app.engine('ejs',ejsMate);
const sessionOption = {
    secret:"mysuperscretecode",
    resave: false,
    saveUninitialized : true,
    cookie :{
        expires :Date.now() + 7*24 *60 *60*1000,
        maxAge : Date.now() + 7*24 *60 *60*1000,
        httpOnly: true
    }
};
 
app.get("/",(req,res)=>{
    res.send("hii i am root")
});


app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success =req.flash("success");
    res.locals.error =req.flash("error");
    next();
});
/**app.get("/demouser",async(req,res)=>{
        let fakeUser = new User({
            email:"student@gmail.com",
            username: "delta-student"
        });
    let registeredUser  =  await User.register(fakeUser,"helloworld");
    res.send(registeredUser); 
})**/
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

app.use((req,res,next)=>{
    next(new expressError(404,"page  not found!"))
});

//error middleware handling
app.use((err,req,res,next)=>{
    let{statusCode =500,message= "something went wrong"} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message});

})
app.listen(8080,()=>{
    console.log("server is listening to port 8080")
}); 