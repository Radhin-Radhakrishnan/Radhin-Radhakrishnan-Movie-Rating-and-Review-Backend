const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        lowercase: true
    },
    movieDescription: {
        type: String,
        required: true,
        lowercase: true
    },
    movieGenre: [ {
        type: String,
        required: true,
        lowercase: true
    } ],
    movieLanguage: {
        type: String,
        required: true,
        lowercase: true
    },
    movieImageUrl: {
        type: String,
    },
    movieImage: {
        type: String,
    },
    moviePublicId: {
        type: String,
        required: true
    }
},
  { timestamps: true },);


const Movie = mongoose.model("Movie",MovieSchema);


module.exports = Movie;