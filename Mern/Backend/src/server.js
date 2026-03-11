import express from "express";
// const express=require("express");
import notesRoutes from "./Routes/notesRoute.js"
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.MONGO_URI)

const app= express();
const PORT= process.env.PORT || 5001;

connectDB();

app.use(express.json()); //middleware

app.use("/api/notes",notesRoutes);

app.listen(PORT, ()=> {
    console.log("Server started on port",PORT);
});


//mongodb://sarnavkansal81_db_user:tmDr9SvxYZddMQO1@ac-hdpfpn5-shard-00-00.hymwrqo.mongodb.net:27017,ac-hdpfpn5-shard-00-01.hymwrqo.mongodb.net:27017,ac-hdpfpn5-shard-00-02.hymwrqo.mongodb.net:27017/?ssl=true&replicaSet=atlas-tixxty-shard-0&authSource=admin&appName=Cluster0

// app.get("/api/notes",(req,res)=> {
//     res.status(200).send("You got 15 notes");
// });

// app.post("/api/notes",(req,res)=> {
//     res.status(201).json({message : "Note created succesfully!"});
// });

// app.put("/api/notes/:id",(req,res)=> {
//     res.status(200).json({message:"Note updated successfully!"});
// });

// app.delete("/api/notes/:id",(req,res)=> {
//     res.status(200).json({message : "Note deleted succesfully!"});
// });
