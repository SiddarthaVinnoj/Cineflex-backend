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