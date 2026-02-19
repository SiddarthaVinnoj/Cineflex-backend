import mongoose from "mongoose";    
const movieSchema = new mongoose.Schema({
    name: String,
    year:Number,
    genre:String,
    language:String,
    imdbRating:Number,
    img:String,
    description:String
})
const Movie = mongoose.model("Movie",movieSchema);
export default Movie;