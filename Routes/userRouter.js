const express = require('express');
const userRouter = express.Router();
const { signUp, signIn, updatePassword, getUserById } = require("../Controllers/userController.js");
const authenticateToken = require('../Middleware/tokenVerify.js');
const { getAllFavoritesOfuser, deleteFavoriteItem } = require('../Controllers/favoriteController.js');
const { getAllTheReviewsOfUser } = require('../Controllers/reviewController.js');

userRouter.post('/signUp', signUp);
userRouter.post('/signIn', signIn);
userRouter.patch('/updatepassword',authenticateToken,updatePassword);
userRouter.get('/info',authenticateToken,getUserById);

userRouter.get('/favorites',authenticateToken,getAllFavoritesOfuser)
userRouter.delete('/favorite/:favoriteId',authenticateToken,deleteFavoriteItem)


userRouter.get('/reviews',authenticateToken,getAllTheReviewsOfUser)

module.exports = userRouter;
