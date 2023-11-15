import express from 'express'
import mongoose from 'mongoose' 
import dotenv from 'dotenv'

import roleRoute from './routes/role.js'

const app = express()
dotenv.config()  //config dotenv paral as variables de entorno

//MIDDLEWARE
app.use(express.json())  //esto sirve para que en las peticiones json se acepte el body de las request


app.use("/api/role", roleRoute)


// DB CONNECTION
const connectMongoDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)  // .env
        console.log("Connected to Database")
    }catch(err){

    }
}


app.listen(8800, () =>{
    connectMongoDB()
    console.log("Connected to Backend")
})