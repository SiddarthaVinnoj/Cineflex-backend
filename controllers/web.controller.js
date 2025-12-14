import Web from "../model/webseries.model.js";
export const getWeb = async (req, res) => {
    try {
        const web = await Web.find();
        res.status(200).json(web);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies", error });
    }
}
export const getwebId = async(req, res) => {
    try {
        const webid = await Web.findById(req.params.id);
        if(!webid){
            return res.status(404).json({message:"not found"});
        }
        res.json(webid);
    } catch (error) {
        return res.status(500).json({message:"invalid id"});
    }
}