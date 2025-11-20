const User = require("../models/User");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}

export const register=async(req,res)=>{
    const {name,email,password}=req.body ;

    try{
        let user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:'user already exists'})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPass=await bcrypt.hash(password,salt)

        user=new User({
            name,email,
            password:hashedPass
        })
        await user.save() 
        res.status(201).json({token:generateToken(user._id)})

    }catch(err){
        res.status(500).json({message:"server error "})
    }
}


export const login=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:'invalid credentials'})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:'invalid credentials'})
        }

        res.json({
            token:generateToken(user._id),
            user:{
                id:user._id,name:user.name,email:user.email
            }
        })

    }catch(err){
        res.status(500).json({message:'server error'})
    }
}

export const getMe=async(req,res)=>{
    const user=await User.findById(req.user).select('-password')
    res.json(user)
}
