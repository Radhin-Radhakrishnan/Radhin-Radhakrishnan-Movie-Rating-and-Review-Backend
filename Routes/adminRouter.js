const express = require('express');
const adminRouter = express.Router();
const authenticateToken= require('../Middleware/tokenVerify.js')
const { getAddedMovies, getSingleMovie, deleteMovie, newlyAddedMovie, updateAMovieDetails } = require("../Controllers/MovieController.js");
const { newAdmin, adminSignin,getAllTheUsers, getAllTheReviewsOfUserById, getAllTheFavoritesOfUser } = require('../Controllers/adminController.js');
const Mutlercloudinary =require('../Middleware/multerStorage.js')



adminRouter.post('/signup',newAdmin);
adminRouter.post('/signin',adminSignin);
adminRouter.get('/users', authenticateToken,getAllTheUsers)


adminRouter.get('/users/:userId/reviews', authenticateToken,getAllTheReviewsOfUserById);
adminRouter.get('/users/:userId/favorites', authenticateToken,getAllTheFavoritesOfUser);


adminRouter.get('/movies',getAddedMovies)
adminRouter.get('/movies/:movieId',getSingleMovie)
adminRouter.post('/movies', authenticateToken,Mutlercloudinary.single("file"),newlyAddedMovie);
adminRouter.patch('/movies/:movieId', authenticateToken,updateAMovieDetails);
adminRouter.delete('/movies/:movieId',authenticateToken,deleteMovie)

module.exports = adminRouter;