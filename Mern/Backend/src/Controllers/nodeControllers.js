export const getAllNodes = (req,res)=> {
    res.status(200).send("You just fetched the notes!");
}

export function createANote(req,res) {
    res.status(200).json({message: "Note created Successfully!"})
}

export function updateANote(req,res) {
    res.status(200).json({message: "Note updated Successfully!"})
}

export function deleteANote(req,res) {
    res.status(200).json({message: "Note deleted Successfully!"})
}