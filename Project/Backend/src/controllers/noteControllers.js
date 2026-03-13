import { messaging } from "firebase-admin";
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

export const createResource = async (req,res) => {
    
}