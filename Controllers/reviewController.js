const  Review = require("../Models/reviewModel.js");
const User = require("../Models/userModel.js");


const addMovieReview = async (req, res) => {
   
    try {
        const userId = req.decoded.data;
        const {movieId} = req.params
        const content = req.body.content
        const mediaTitle = req.body.mediaTitle
        const mediaRating = req.body.mediaRating
        const review = new Review({
            user: userId,
            content,
            mediaType: "movie",
            mediaId: movieId,
            mediaTitle,
            mediaRating
        });

        await review.save()
       return res.status(201).json({...review._doc, user: userId})
    } catch (error) {
        console.log("error :", error)
        res.status(500).json({error: "failed"});
    }
}
// it is used for getting all the reviews of a user
const getAllTheReviewsOfUser = async (req,res) => {
    try {
        
        const decoded = req.decoded;
        const userId = decoded.data
        const reviews = await Review.find({user: userId})
        res.status(200).json(reviews)
    } catch (error) {
        console.log("error :", error)
        res.status(500).json({error: "failed"});
    }
}

const getAllTheReviewsOfmovieBySingleUser = async (req, res) => {
    try {
      const  userId  = req.decoded.data; // Assuming userId is in decoded data
      const mediaId = req.params.movieId; // Assuming movieId is a parameter
  
      // Filter by both userId and movieId
      const reviews = await Review.find({ user: userId, mediaId });
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error getting user reviews:", error);
      res.status(500).json({ error: "Failed to retrieve reviews" }); // More specific error message
    }
};

//used for getting the reviews of a movie by multiple users
const getAllTheReviewsOfmovie = async (req, res) => {
    try {
      const mediaId = req.params.movieId; // Assuming movieId is a parameter
  
      // Filter by both userId and movieId
      const reviews = await Review.find({ mediaId: mediaId } );

      const userId = reviews.map((review) => {
        return review.user
      })

      const users = await User.find({_id: userId})
      
  
      res.status(200).json({reviews, users: users.map(user => [{ firstName:user.firstName, id: user.id }])} );
    } catch (error) {
      console.error("Error getting user reviews:", error);
      res.status(500).json({ error: "Failed to retrieve reviews" }); // More specific error message
    }
};
  

const deleteTheReviews = async (req,res) => {
    try {
        const reviewId = req.params.reviewId;
        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({data: "Deleted"})
    } catch (error) {
        console.log("error :", error)
        res.status(500).json({error: "failed"});
    }
}


module.exports = { getAllTheReviewsOfUser,addMovieReview,deleteTheReviews,getAllTheReviewsOfmovieBySingleUser,getAllTheReviewsOfmovie}