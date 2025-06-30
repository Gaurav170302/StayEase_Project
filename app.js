const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));  // to parse data which came from req.params & req.body in proper format
app.use(methodOverride("_gaurav"));
app.engine('ejs', ejsMate);  // ejsMate is used for templating like navbar & footer which will same to all ejs (files)templates
app.use(express.static(path.join(__dirname, "public")));  // to server static files css, js & many more


// app.get("/testListing", async (req, res) => {
//     let sample = new Listing({
//         title : "My New Villa",
//         description : "By the beach",
//         price : 1500,
//         location : "Goa",
//         country : "India"
//     });

//     await sample.save();
//     console.log("Sample was saved");
//     res.send("Successful testing");
// });

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});

app.get("/", (req, res) => {
    res.send("Hi I am root");
});

// Index Route
app.get("/listings", async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
});

// New Route    (to prevent error "new route" is added before "show route" else error comes becoz show route directs to "/listings/:id" after this route if any route comes with same route like "/listings/....(anything)"  it will treated as "/listings/:id" route & try to find id of these route hence error comes which had alreay created so error arrives)
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})



// // Create Route
// app.post("/listings", async (req, res) => {
//     let {title, description, image, price, location, country} = req.body;
//     const newListing = new Listing({
//         title : title,
//         description : description,
//         image : image,
//         price : price,
//         location : location,
//         country : country
//     });


//     console.log(newListing);

//     await newListing.save();
//     res.redirect("/listings");
// });


// Create Route 
// This is shortcut for above method
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.gaurav);
    await newListing.save();
    res.redirect("/listings");
});


// Create Route another approach
// app.post("/listings", upload.single("image"), async (req, res) => {
//     const { title, description, price, location, country } = req.body.gaurav;

//     const newListing = new Listing({
//         title,
//         description,
//         price,
//         location,
//         country,
//         image: req.file ? req.file.filename : null // save filename in DB
//     });

//     await newListing.save();
//     res.redirect("/listings");
// });


// Update (Edit) Route
app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

// Update Route
app.put("/listings/:id", async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.gaurav});
    res.redirect(`/listings/${id}`);
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    console.log(deletedListing);
});

//Show Route    solution :- the interpreter reads the code line by line when we put the show route at first the remaining routes line listing/user is there for example one route  the browser thinks user is also one id (when error occured my TA suggest me to put show route at last)
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});


// Errors occured in project
// Error 1 :- the default img is not getting the image name is converting to id    
//  Solution 1 :- the interpreter reads the code line by line when we put the show route at first the remaining routes line listing/user is there for example one route  the browser thinks user is also one id (when error occured my TA suggest me to put show route at last)