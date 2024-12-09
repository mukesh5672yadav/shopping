const mongoose=require('mongoose');
const signupmodel=mongoose.model("signup",new mongoose.Schema({
    mobile:{type:String,required:true},
    password:{type:String,required:true}
}));

module.exports=signupmodel;
