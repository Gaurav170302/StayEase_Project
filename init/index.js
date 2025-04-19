const mongoose = require("mongoose");
const sampleData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/StayEase";

gaurav()
 .then(() => {
     console.log("connected to DB");
 }).catch((err) => {
     console.log("Error : ", err);
 });

async function gaurav() {
    await mongoose.connect(MONGO_URL);
}

const sampleDb = async() => {
    await Listing.deleteMany({});
    await Listing.insertMany(sampleData.data);
    console.log("Sample data was inserted");
}

sampleDb();