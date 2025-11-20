require('dotenv').config() 

const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')


const app=express() 

app.use(express.json())
app.use(cors())

const MONGO_URI=process.env.MONGO_URI

mongoose.connect(MONGO_URI)
        .then(()=>{
            console.log("mongodb connected")
            console.log(err)
        })


app.get('/api/notes',)


app.listen(3000,()=>[

    console.log('app is listening on port 3000')
])