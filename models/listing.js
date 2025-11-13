const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type :String,
    required: true,
  },
  image: {
    filename: String,
    url: {
      type: String,
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=80"
          : v,
    },
  },
  price:{
    type:Number,
    required: true
  },
  location: String,
  country: String,
  reviews: [
    {
      type :Schema.Types.ObjectId,
      ref :"Review"
    }
  ]
});
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
     await Review.deleteMany({_id: {$in: listing.reviews}})
  } 
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
