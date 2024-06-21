const express  = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const reviewcontroller =  require("../controllers/reviews.js")
const {validateReview, isLoggedIn,isReviewCommentby}= require("../middleware.js");

      //Post review route
      router.post("/", 
        isLoggedIn,
        validateReview,
        wrapAsync( reviewcontroller.postreview));
        
        //Delete Reviews route
        router.delete(
          "/:reviewID",
          isReviewCommentby,
          isLoggedIn,
          wrapAsync(reviewcontroller.deletereview)
        );
  
        module.exports = router;
        