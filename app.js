const express = require('express')
const cors=require("cors")
const app = express()
const port = 3000
const dbConnect= require("./config/dbConfig.js")
require('dotenv').config()

const { cloudinaryInstance } = require('./config/cloudinary.js');

const allRoutes=require('./Routes/index.js')



app.use(express.json())
app.use(express.urlencoded({ extended: false }));

dbConnect()

app.use(cors())
app.use("/api/v1", allRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})