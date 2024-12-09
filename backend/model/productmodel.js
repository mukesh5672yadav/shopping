const mongoose=require('mongoose');
const productmodel=mongoose.model("product",new mongoose.Schema({
    subcategory:{type:String,required:true},
    productname:{type:String,required:true},
    price:{type:String,required:true},
    offerprice:{type:String,required:true},
    description:{type:String,required:true},
    pic:{type:String,required:true}
}));

module.exports=productmodel;