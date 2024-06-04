const Movie= require("../Models/movieModel");


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


module.exports={getAddedMovies,getSingleMovie,deleteMovie}

