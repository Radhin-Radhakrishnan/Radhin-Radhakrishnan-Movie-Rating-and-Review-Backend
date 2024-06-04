const mongoose = require('mongoose');

const { Schema } = mongoose;

const favoriteSchema = new mongoose.Schema({
    user: [ {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    } ],
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
    mediaImage: {
        type: String,
        required: true,
    }
},
{ timestamps: true },
);

const Favorite = mongoose.model("Favorite", favoriteSchema)

module.exports = Favorite