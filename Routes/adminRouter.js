const express = require('express');
const adminRouter = express.Router();
const authenticateToken= require('../Middleware/tokenVerify.js')
const { getAddedMovies, getSingleMovie, deleteMovie } = require("../Controllers/MovieController.js");
const { newAdmin, adminSignin, getSingleAdmin, getAllTheUsers } = require('../Controllers/adminController.js');



adminRouter.post('/signup',newAdmin);
adminRouter.get('signin',adminSignin);
adminRouter.get('/',authenticateToken,getSingleAdmin) ;
adminRouter.get('/users', authenticateToken,getAllTheUsers)


adminRouter.get('/movies',getAddedMovies)
adminRouter.get('/movies/:movieId',getSingleMovie)
adminRouter.delete('/movies/:movieId',authenticateToken,deleteMovie)

module.exports = adminRouter;