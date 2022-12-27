const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
name:String,
age:Number,

})
const user=mongoose.model('user',userSchema)
module.exports=user