const mongoose=require('mongoose')
const orderdetails=mongoose.model("details",new mongoose.Schema({
    orderno:{type:String,required:true},
    productname:{type:String,required:true},
    price:{type:String,required:true},
    pic:{type:String,required:true},
    quantity:{type:String,required:true},
    offerprice:{type:String,required:true}
}));

module.exports=orderdetails;