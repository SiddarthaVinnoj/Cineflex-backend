import Kid from "../model/kids.model.js";
export const getKids = async (req, res) => {
    try {
        const kids = await Kid.find();
        res.status(200).json(kids);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies", error });
    }
}
export const getKidId = async(req, res) =>{
    try {
        const kidId = await Kid.findById(req.params.id);
        if(!kidId){
           return res.status(404).json({message:"Not found"});
        }
        res.json(kidId);
    } catch (error) {
        return res.status(500).json({message:"invalid id"});
    }
}