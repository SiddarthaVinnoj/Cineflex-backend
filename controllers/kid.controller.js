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

export const createKid = async (req, res) => {
    try {
        const data = req.body;
        const kid = new Kid(data);
        await kid.save();
        res.status(201).json(kid);
    } catch (error) {
        res.status(500).json({ message: "Error creating entry", error });
    }
};

export const updateKid = async (req, res) => {
    try {
        const kid = await Kid.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!kid) return res.status(404).json({ message: "Not found" });
        res.json(kid);
    } catch (error) {
        res.status(500).json({ message: "Error updating entry", error });
    }
};

export const deleteKid = async (req, res) => {
    try {
        const kid = await Kid.findByIdAndDelete(req.params.id);
        if (!kid) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting entry", error });
    }
};