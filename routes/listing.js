const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

//Index Route
//Create Route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  // .post(
  //   isLoggedIn,
  //   validateListing,
  //   wrapAsync(listingController.createlisting)
  // );
  .post(upload.single("listing[image]"), (req, res) => {
    res.send(req.file);
  });

//New Route
router.get("/new", isLoggedIn, listingController.newroute);

//Update Route
//Show Route
//Delete Route
router
  .route("/:id")
  .get(wrapAsync(listingController.showroute))
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updatelisting)
  )
  .delete(isLoggedIn, wrapAsync(listingController.deletelisting));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editlisting)
);

module.exports = router;
