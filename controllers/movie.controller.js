import Movie from "../model/movie.model.js";
export const getMovie = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies", error });
    }
}
export const getMovieId = async(req, res) =>{
    try {
        const Movieid = await Movie.findById(req.params.id);
        if(!Movieid){
            return res.status(404).json({message:"movie not found"});
        }
        res.json(Movieid);
        } catch (error) {
            return res.status(500).json({message:"Invalid id"})
        
    }
}

export const createMovie = async (req, res) => {
    try {
        const data = req.body;
        const movie = new Movie(data);
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ message: "Error creating movie", error });
    }
};

export const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) return res.status(404).json({ message: "Movie not found" });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: "Error updating movie", error });
    }
};

export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) return res.status(404).json({ message: "Movie not found" });
        res.json({ message: "Movie deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting movie", error });
    }
};