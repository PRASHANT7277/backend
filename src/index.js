const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const user=require('./user/user.router')

const dotenv=require("dotenv").config()

const app=express()

app.use(express.json())
app.use(cors({origin:'*'}))

app.use("/user",user)
app.listen(process.env.PORT,async()=>{
  await mongoose.connect(process.env.URL || 8080);
  console.log(`your Mongoose connectionis at ${process.env.PORT}`);
})