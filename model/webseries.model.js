import mongoose from "mongoose";    
const webSchema = new mongoose.Schema({
    name: String,
    year:Number,
    genre:String,
    language:String,
    imdbRating:Number,
    img:String,
    description:String
})
const Web = mongoose.model("Web",webSchema);
export default Web;