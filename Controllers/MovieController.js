const Movie= require("../Models/movieModel");
const {cloudinaryInstance} = require("../config/cloudinary.js");


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
    console.log("hitting");
    try {
       
        if (!req.body.image && !(req.file && req.file.path) && !req.body.imageUrl) {
            return res.status(400).json({ message: "please upload an image" });
        }
        
        let  mediaPublicId,imageLink;
        const { name, description, genre, language,imageUrl } = req.body;
        const title = name;
        const mediaDescription = description;
        const mediaGenre = genre;
        const mediaLanguage = language;
        console.log(imageUrl);

        if (imageUrl) {
            const imageUrlresult = await cloudinaryInstance.uploader.upload(imageUrl);
            imageLink = imageUrlresult.url;
            mediaPublicId = imageUrlresult.public_id;
        } 
        console.log("working")

        const movie = new Movie({
            title,
            mediaDescription,
            mediaGenre,
            mediaLanguage,
            mediaImageUrl: imageLink,
            mediaPublicId
        });

        await movie.save();

        return res.status(201).json({ movie, message: "Movie added" });

    } 
    
    catch (error) {
        console.log("second");
        console.log("Adding new movie failed: ", error);
        res.status(500).json({ message: "Operation failed" });
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

