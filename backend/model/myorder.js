const mongoose=require('mongoose');
const myorder=mongoose.model("order",new mongoose.Schema({
    orderno:{type:String,required:true},
    total:{type:String,required:true},
    discount:{type:String,required:true},
    amountpay:{type:String,required:true},
    candidate:{type:String,required:true},
    mobile:{type:String,required:true},
    address:{type:String,required:true},
    status:{type:String,required:true},
    orddate:{type:String,required:true}
    
}))
module.exports=myorder;