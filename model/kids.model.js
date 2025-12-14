import mongoose from "mongoose";    
const kidsSchema = new mongoose.Schema({
    name: String,
    year:Number,
    genre:String,
    language:String,
    imdbrating:Number,
    img:String,
    description:String
})
const Kid = mongoose.model("Kid",kidsSchema);
export default Kid;