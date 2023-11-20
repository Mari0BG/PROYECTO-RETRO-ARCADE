import express from 'express'
import mongoose from 'mongoose' 
import dotenv from 'dotenv'
import roleRoute from './routes/role.js'
import productRoute from './routes/product.js'
import categoryRoute from './routes/category.js'

const app = express() 
dotenv.config()  //config dotenv paral as variables de entorno

//MIDDLEWARE
app.use(express.json())  //esto sirve para que en las peticiones json se acepte el body de las request

app.use("/api/role", roleRoute)
app.use("/api/category", categoryRoute)
app.use("/api/product", productRoute)

// DB CONNECTION
const connectMongoDB = async ()=>{
    
    try{
        await mongoose.connect(process.env.MONGO_URL)  // .env
        console.log("Connected to Database")
    }catch(err){
        console.log("Error "+err.mongoose) 
    }
}


app.listen(8800, () =>{
    connectMongoDB()
    console.log("Connected to Backend")
})