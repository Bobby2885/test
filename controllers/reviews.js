const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { model } = require("mongoose");


module.exports.postreview = async (req,res)=>{
    let listing = await Listing.findById(req.params.id);

    let newReview = new Review(req.body.review);
    newReview.commentby = req.user._id;
    console.log(newReview)
  
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);

  };

module.exports.deletereview = async (req,res)=>{
    let { id,reviewID}= req.params;


  await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewID}});
  await Review.findByIdAndDelete(reviewID);

  res.redirect(`/listings/${id}`)
};

