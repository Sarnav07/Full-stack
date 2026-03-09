import express from "express";

import {createANote, deleteANote, getAllNodes, updateANote} from "../Controllers/nodeControllers.js";

const router = express.Router();

router.get("/",getAllNodes);
router.post("/",createANote);
router.put("/:id",updateANote);
router.delete("/:id",deleteANote);

export default router;