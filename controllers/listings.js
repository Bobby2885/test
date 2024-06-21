const Listing = require("../models/listing.js");


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  };
  
module.exports.newroute = (req,res)=>{
    res.render("listings/new.ejs");
  };

module.exports.showroute = async (req,res)=>{
    let {id} =  req.params;
    const listing =await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
          path:"commentby"
        },
    })
    .populate("owner");
       if(!listing){
        req.flash("error","Listing does not exist");
        res.redirect("/listings");
       }
        res.render("listings/show.ejs",{listing});
};

module.exports.createlisting = async (req,res,next)=>{
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success","New listing created");
    res.redirect("listings/");
  };

module.exports.editlisting = async (req,res)=>{ 
    let {id} =  req.params;
    const listing =await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
  };

module.exports.updatelisting = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success","Listing Edit");
    res.redirect(`/listings/${id}`);
  };

module.exports.deletelisting = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("deleted","Listing Deleted");
    res.redirect("/listings");
  };
  





