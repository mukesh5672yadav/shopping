const mongoose=require('mongoose');
const adminmodel=mongoose.model("admin",new mongoose.Schema({
    mobile:{type:String,required:true},
    password:{type:String,required:true}
}));

module.exports=adminmodel;