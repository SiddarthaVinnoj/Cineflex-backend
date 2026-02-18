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

export const createWeb = async (req, res) => {
    try {
        const data = req.body;
        const web = new Web(data);
        await web.save();
        res.status(201).json(web);
    } catch (error) {
        res.status(500).json({ message: "Error creating entry", error });
    }
};

export const updateWeb = async (req, res) => {
    try {
        const web = await Web.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!web) return res.status(404).json({ message: "Not found" });
        res.json(web);
    } catch (error) {
        res.status(500).json({ message: "Error updating entry", error });
    }
};

export const deleteWeb = async (req, res) => {
    try {
        const web = await Web.findByIdAndDelete(req.params.id);
        if (!web) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting entry", error });
    }
};