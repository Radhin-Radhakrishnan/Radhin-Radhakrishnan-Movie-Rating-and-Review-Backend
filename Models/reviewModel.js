const mongoose = require('mongoose');
const { Schema } = mongoose

const reviewSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
        minlength: 8,
        lowercase: true
    },
    mediaType: {
        type: String,
        enum: [ "movie" ],
        required: true,
    },
    mediaId: {
        type: String,
        required: true,
    },
    mediaTitle: {
        type: String,
        required: true,
        lowercase: true
    },
    mediaRating: {
        type: Number,
        required: true,
        max: 5
    }
    
},
{ timestamps: true },
);


const Review = mongoose.model("Review", reviewSchema);

module.exports = Review