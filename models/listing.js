const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required : true
    },

    description : String, 

    image : {
        type : String,
        default : "img.jpg", // img is undefined, null or does not exist 
        set : (v) => v==="" ? "img.jpg" : v, // having an img but link of img is empty
    }, 
    price : Number,
    location : String,
    country : String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;