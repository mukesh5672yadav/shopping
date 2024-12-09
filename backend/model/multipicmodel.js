const mongoose=require('mongoose');
const multipicmodel=mongoose.model("multipic",new mongoose.Schema({
    picid:{type:String,required:true},
    picture:{type:String,required:true}
}));

module.exports=multipicmodel;