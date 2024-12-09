const mongoose=require('mongoose');
const addtocart=mongoose.model("addtocart",new mongoose.Schema({
    productname:{type:String,required:true},
    price:{type:String,required:true},
    offerprice:{type:String,required:true},
    pic:{type:String,required:true},
    mobile:{type:String,required:true},
    quantity:{type:String,required:true}
}));

module.exports=addtocart;