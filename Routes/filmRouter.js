const express = require('express');
const authenticateToken=require('../Middleware/tokenVerify.js');
const { getAllTheReviewsOfmovieBySingleUser, getAllTheReviewsOfmovie, addMovieReview, deleteTheReviews} = require('../Controllers/reviewController');
const { addFavoriteMovie } = require('../Controllers/FavoriteController.js');

const filmrouter = express.Router();

filmrouter.get('/:movieId/reviews',authenticateToken,getAllTheReviewsOfmovieBySingleUser);
filmrouter.get('/:movieId/otherReviews',getAllTheReviewsOfmovie);
filmrouter.post( '/:movieId/reviews',authenticateToken,addMovieReview);
filmrouter.delete('/:reviewId',authenticateToken,deleteTheReviews);

//faviorites of User
filmrouter.post('/:movieId/favorite', authenticateToken,addFavoriteMovie);

module.exports=filmrouter;