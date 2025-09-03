const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type :String,
        required : true,
    },
    description : String,
    image :{
        type :String,
        default : "https://unsplash.com/photos/woman-with-long-brown-hair-looking-over-shoulder-wr6ufZVksaI",
        set : (v)=>
          v===""? "https://unsplash.com/photos/woman-with-long-brown-hair-looking-over-shoulder-wr6ufZVksaI"
          : v,
    },
    price : String,
    location : String,
    country : String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports =Listing;