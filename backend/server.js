import exp from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { userApp } from './APIS/UserApis.js'
import cors from 'cors'

config()
const app=exp()
// add cors 

//same server !!

app.use(cors({
  origin:"http://localhost:5173"
}))
// add bodyparser middleware
app.use(exp.json())

// API'S
app.use('/user-api',userApp)
// connect to db
async function connectDb(){
    try{
        // connect to databse 
        await connect('mongodb://localhost:27017/stack01')
        console.log('connected to database ')
        // start server
        app.listen(process.env.PORT,()=>{
            console.log("server started listening at port 3000")
        })
    }
    catch(err){
        console.log('error in connecting to DB',err)
    }
}
connectDb()

// path Misshandle Middleware
app.use((req,res,next)=>{
    res.status(401).json({message: `Invalid path ${req.url} `})
})
// error handling middleware
app.use((err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
  });
});