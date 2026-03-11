import express from "express";
import {
    getAllResources,
    getResourcesById,
    createResource,
    updateResource,
    deleteResource
} from "../controllers/noteControllers.js";

const router = express.Router();

router.get("/",getAllResources);
router.get("/:id",getResourcesById);
router.post("/",createResource);
router.put("/:id",updateResource);
router.delete("/:id",deleteResource);

export default router;




