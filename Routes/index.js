const express = require('express');
const router = express.Router();

const userRoutes = require("./userRouter.js")
const filmRouter=require("./filmRouter.js")
const adminRouters = require('./adminRouter.js')

router.use('/user', userRoutes)
router.use('/movie', filmRouter)
router.use('/admin',adminRouters)

module.exports = router;