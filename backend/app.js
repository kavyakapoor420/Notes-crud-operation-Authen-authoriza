require('dotenv').config() 

const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')

const protected=require('./Middlewares/authMiddleware')
const { getNotes, createNotes, updateNotes, deleteNote } = require('./Controllers/noteController')
const { register, login, getMe } = require('./Controllers/authController')


const app=express() 

app.use(express.json())
app.use(cors())

const MONGO_URI=process.env.MONGO_URI

mongoose.connect(MONGO_URI)
        .then(()=>{
            console.log("mongodb connected")     
        }).catch((err)=>{
            console.log(err)
        })

app.post('/api/auth/register',register)
app.post('/api/auth/login',login)
app.get('/api/auth/me',protected,getMe)


app.get('/api/notes',protected,getNotes)
app.post('/api/notes',protected,createNotes)
app.put('/api/notes/:id',protected,updateNotes)
app.delete('/api/notes/:id',protected,deleteNote)



app.listen(5000,()=>{

    console.log('app is listening on port 3000')
})