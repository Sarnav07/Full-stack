import {db} from "../config/db.js";

export const getAllResources = async (req,res)=> {
    try {
        const snapshot=await db.collection('resources').orderBy("createdAt","desc").get();
        const resources = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.status(200).json(resources);
    }
    catch(error) {
        res.status(500).json({message:"can't load the resources!",error});
    }
};

export const getResourcesById = async (req,res) => {
    try {
        const {id} = req.params;
        const doc = await db.collection("resources").doc(id).get();

        if (!doc.exists) {
            return res.status(404).json({message:"Can't find the resource!"});
        }
        res.status(200).json({id:doc.id, ...doc.data()});
    } catch (error) {
        res.status(500).json({message:"can't fetch the data",error});
    }
};

export const createResource = async (req, res) => {
    try {
        const { title, status, understandingScore } = req.body;
        const docRef = await db.collection("resources").add({
            title,
            status,
            understandingScore,
            createdAt: new Date().toISOString() 
        });
        res.status(201).json({ id: docRef.id, message: "Resource added successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Failed to add resource", error });
    }
};

export const updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, understandingScore } = req.body;

        await db.collection("resources").doc(id).update({
            status,
            understandingScore,
            updatedAt: new Date().toISOString()
        });

        res.status(200).json({ message: "Resource updated successfully!" });
    } catch (error) {
        console.error("Error updating resource:", error);
        res.status(500).json({ message: "Failed to update resource", error });
    }
};

export const deleteResource = async (req, res) => {
    try {
        const { id } = req.params;

        await db.collection("resources").doc(id).delete();
        
        res.status(200).json({ message: "Resource deleted successfully!" });
    } catch (error) {
        console.error("Error deleting resource:", error);
        res.status(500).json({ message: "Failed to delete resource", error });
    }
};