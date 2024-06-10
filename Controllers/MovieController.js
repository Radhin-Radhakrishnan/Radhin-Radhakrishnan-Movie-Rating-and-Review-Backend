const Movie= require("../Models/movieModel");
const { cloudinary } = require("../config/cloudinary.js");


const getAddedMovies = async (req, res) => {
    try {
        const movies = await Movie.find({}).sort({createdAt: 1}).exec();
        res.status(200).json(movies);
    } catch (error) {
        console.log("fetching data failed: ", error);
        res.status(500).json({ message: "Operation failed" })
    }
}

const getSingleMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const movie = await Movie.findById(movieId)
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
          }
        res.status(200).json(movie)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Operation Failed"})
    }
}

const deleteMovie = async (req, res) => {
    try {
       
        const movie = await Movie.findById(req.params.movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        await movie.deleteOne()

        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        console.error("Delete movie failed: ", error);
        res.status(500).json({ message: "Operation failed" });
    }
}

const newlyAddedMovie = async (req, res) => {
    try {
        console.log("first")
        if (!req.body.imageUrl && !req.file.path) {
            return res.status(400).json({message: "please upload a image "})
        }
        if (req.body.imageUrl) {
            const imageUrlresult = await cloudinary.uploader.upload(req.body.imageUrl, { fetch_format: 'auto' });
            const { name, description, genre, language } = req.body;
            const title = name;
            const mediaDescription = description;
            const mediaGenre = genre;
            const mediaLanguage = language;
            const mediaImageUrl = imageUrlresult.secure_url
            const mediaPublicId = imageUrlresult.public_id

            const movies = new Movie({
                title,
                mediaDescription,
                mediaGenre,
                mediaLanguage,
                mediaImageUrl,
                mediaPublicId
            });
    
            await movies.save();
    
            return res.status(201).json({movies, message: "Movie added"});

        }
        if (req.file.path) {
            console.log("second")
            const result = await cloudinary.uploader.upload(req.file.path);
            const { name, description, genre, language } = req.body;
            const title = name;
            const mediaDescription = description;
            const mediaGenre = genre;
            const mediaLanguage = language;
            const mediaImage = result.secure_url;
            const mediaPublicId = result.public_id
    
            const movies = new Movie({
                title,
                mediaDescription,
                mediaGenre,
                mediaLanguage,
                mediaImage,
                mediaPublicId
            });
    
            await movies.save();
            return res.status(201).json({movies, message: "Movie added"});
        } 

    } catch (error) {
        console.log("added new movie failed: ", error);
        res.status(500).json({ message: "Operation failed" })
    }
}
const updateAMovieDetails = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { title, description, genre, language, rating, image } = req.body;
        const mediaTitle = title;
        const mediaDescription = description;
        const mediaGenre = genre;
        const mediaLanguage = language;
        const mediaRating = rating;
        const mediaImage = image;
        const updateMovies = await Movie.findByIdAndUpdate(movieId, { mediaTitle, mediaDescription, mediaGenre, mediaLanguage, mediaRating, mediaImage }, { new: true }).exec();
        res.status(200).json(updateMovies);

    } catch (error) {
        console.log("updating a movie failed: ", error);
        res.status(500).json({ message: "Operation failed" });
    }
}

module.exports={getAddedMovies,getSingleMovie,deleteMovie,newlyAddedMovie,updateAMovieDetails}

