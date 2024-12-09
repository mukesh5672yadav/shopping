const mongoose=require('mongoose');
const subcategorymodel=mongoose.model("subcategory",new mongoose.Schema({
    catid:{type:String,required:true},
    subcatname:{type:String,required:true}
}));

module.exports=subcategorymodel;