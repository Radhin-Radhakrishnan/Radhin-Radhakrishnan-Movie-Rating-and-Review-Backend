const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        lowercase: true
    },
    mediaDescription: {
        type: String,
        required: true,
        lowercase: true
    },
    mediaGenre: [ {
        type: String,
        required: true,
        lowercase: true
    } ],
    mediaLanguage: {
        type: String,
        required: true,
        lowercase: true
    },
    mediaImageUrl: {
        type: String,
    },
    mediaImage: {
        type: String,
    },
    mediaPublicId: {
        type: String,
       
    }
},
  );


const Movie = mongoose.model("Movie",MovieSchema);


module.exports = Movie;