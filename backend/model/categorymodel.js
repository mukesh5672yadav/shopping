const mongoose=require('mongoose')
const categorymodel=mongoose.model("category",new mongoose.Schema({
    category:{type:String,required:true}
}));
module.exports=categorymodel;