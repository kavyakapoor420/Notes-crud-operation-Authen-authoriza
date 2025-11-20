const Note = require("../models/Note");



export const getNotes=async(req,res)=>{

    try{
        const notes=(await Note.find({user:req.user})).toSorted({createdAt:-1})
        res.json(notes)

    }catch(err){
        res.status(500).json({message:'server error'})
    }
}

export const createNotes=async(req,res)=>{

    const {title,content,tags,color}=req.body ;

    try{
        const note=new Note({
            user:req.user ,title,content,tags,color
        })

        await note.save() 
        res.status(201).json(note)

    }catch(err){
        res.status(400).json({message:'invalid data'})
    }
}

export const updateNotes=async(req,res)=>{

    try{
        const note=await Note.findOneAndUpdate(
            {_id:req.param.id,user:req.user},
            req.body ,
            {new:true}
        )

        if(!note){
            return res.status(404).json({message:'note not found'})
        }

        res.json(note)

    }catch(err){
        res.status(500).json({message:'server error'})
    }
}

export const deleteNote=async(req,res)=>{
    try{
        const note=await Note.findOneAndDelete({
            _id:req.params.id,user:req.user 
        })
        if(!note){
            return res.status(404).json({message:'notes not found'})
        }

        res.json({message:'note deleted'})

    }catch(err){
        res.status(500).json({message:'server error'})
    }
}

