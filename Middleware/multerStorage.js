const multer = require("multer");
const { cloudinary } = require("../Config/cloudinaryConfig");
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'movies', // Optional - specify the folder to upload the images to
      format: async (req, file) => 'png', // Optional - specify the format of the uploaded image
      public_id: (req, file) => file.originalname // Optional - specify the public ID of the uploaded image
    }
  });

const multerStorageCloudinary = multer({storage: storage}).single('image')

module.exports = multerStorageCloudinary;