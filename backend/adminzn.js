const cookieParser=require("cookie-parser");
const express=require('express');
const app=express();
const cors=require('cors');
const adminmodel=require('./model/adminmodel');
const mongoose=require('mongoose');
const categorymodel = require('./model/categorymodel');
const subcategorymodel = require('./model/subcategorymodel');
const productmodel = require('./model/productmodel');
const con=mongoose.connect('mongodb://127.0.0.1:27017/mydb');
const multer=require('multer');
const signupmodel = require("./model/signupmodel");
const addtocart = require("./model/addtocart");
const myorder = require("./model/myorder");
const orderdetails = require("./model/orderdetails");
const multipicmodel = require("./model/multipicmodel");

con.then(()=>{
    console.log("Connection Successful");
})
con.catch(()=>{
    console.log("Error in Connection");
})

app.use(express.json());
app.use(cors({"origin":true,"credentials":true})); 
app.use(cookieParser());
app.use(express.static("propics"));    
app.use(express.static("propics1"));    
                                                                                              

app.post("/admin",async(req,res)=>{
    try{
        const rec=new adminmodel({
            mobile:req.body.mob,
            password:req.body.psw
        });

        if(await rec.save()){
            res.json({msg:"Record Saved"});
        }
        else{
            res.json({msg:"Error in Record Saved"});
        }
    }
    catch(e){
        res.json({msg:"Something Went Wrong"});
    }
});

app.post("/admin1",async(req,res)=>{
    try{
        const re=await adminmodel.findOne({mobile:req.body.m, password:req.body.p})
        if(re)
        {
            res.cookie("mycookie",req.body.m).json({msg:"Valid User"});
        }
        else{
            res.json({msg:"Invalid User"});
        }
    }
    catch(e){
        res.json({msg:"Record Not Get"});
    }
    
});

app.post("/signup",async(req,res)=>{
    try{
        const rec=await signupmodel({
            mobile:req.body.mob,
            password:req.body.psw
        })
        if(await rec.save())
        {
            res.json({msg:"Record Saved"})
        }
        else{
            res.json({msg:"Record not Saved"})
        }
        
    }
    catch{
        res.json({msg:"Error in Record Saved"})
    }
});

app.post("/login",async(req,res)=>{
    try{
        const re=await signupmodel.findOne({mobile:req.body.mob, password:req.body.psw})
        if(re){
            res.json({msg:"Valid User"});
        }
        else{
            res.json({msg:"Invalid User"});
        }
    }
    catch{
        res.json({msg:"Error in Record Get"});
    }
})



app.post("/category1",async(req,res)=>{
    try{
    const rec=new categorymodel({
        category:req.body.cat
    });
    if(await rec.save()){
        res.json({msg:"Record Saved"});
    }
    else{
        res.json({msg:"Error in Record Saved"});
    }
}
catch(e){
    res.json({msg:"Something Went Wrong"});
}
});


app.get("/category1/:id",async(req,res)=>{
    try{
        const re=await categorymodel.find({_id:req.params.id})
        res.json(re);
    }
    catch(e){
        res.json({msg:"Error in Record Get"});
    }

});

app.get("/category1",async(req,res)=>{
    try{
        const re=await categorymodel.find();
        res.json(re);
        
    }
    catch(e){
        res.json({msg:"Record Get Not Get"});
    }

});

app.delete("/category1",async(req,res)=>{
    try{
    const re=await categorymodel.findOneAndDelete({_id:req.body.rid})
        res.json({msg:"Record Delete"})
    }
    catch(e){
        res.json({msg:"Error in Record Delete"});
    }
});

app.put("/category1",async(req,res)=>{
    try{
        const re=await categorymodel.findOneAndUpdate({_id:req.body.rid},{category:req.body.cat})
        res.json({ msg: "Record Update" })
    }
    catch(e)
    {  
        res.json({msg:"Error in Record Saved"});
    }
});



app.post("/subcatbycat",async(req,res)=>{
    try{
        const re=await subcategorymodel.find({catid:req.body.cid})
        res.json(re);
    }
    catch{
        res.json({msg:"Error"})
    }
});

app.post("/probycat",async(req,res)=>{
    try{
        const re=await productmodel.find({subcategory:req.body.scid})
        res.json(re);
    }
    catch{
        res.json({msg:"Error"})
    }
});



app.post("/subcategory",async(req,res)=>{
    try{
        const rec=new subcategorymodel({
            catid:req.body.id,
            subcatname:req.body.catname
        });

        if(await rec.save()){
            res.json({msg:"Record Saved"});
        }
        else{
            res.json({msg:"Error in Record Saved"});
        }
    }
    catch(e){
        res.json({msg:"Something Went Wrong"});
    }
});

app.delete("/subcategory",async(req,res)=>{
    try{
    const re=await subcategorymodel.findByIdAndDelete({_id:req.body.rid})
        res.json({msg:"Record Delete"})
    }
    catch(e){
        res.json({msg:"Error in Record Delete"});
    }
});

app.get("/subcategory",async(req,res)=>{
    try{
        const re=await subcategorymodel.find();
        res.json(re);
    }
    catch(e){
        res.json({msg:"Error in Record Get"});
    }

});


const mystorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./propics');
    },
    filename:(req,file,cb)=>{
        const ext=file.mimetype.split('/')[1];
        cb(null,"pic_"+Date.now()+"."+ext);
    }
});


const myfilter=(req,file,cb)=>{
    const ext=file.mimetype.split('/')[1];
    if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="bmp")
    {
        cb(null,true);
    }
    else{
        cb("Please select valid image",false);
    }
}

const upload=multer({
    storage:mystorage,
    fileFilter:myfilter
});


app.post("/product",upload.single("pro_pic"),async(req,res)=>{
    try{
        const rec=new productmodel({
            subcategory:req.body.subcat,
            productname:req.body.pname,
            price:req.body.price,
            offerprice:req.body.ofprice,
            description:req.body.des,
            pic:req.file.filename

        });

        if(await rec.save()){
            res.json({msg:"Record Saved"});
        }
        else{
            res.json({msg:"Error in Record Saved"});
        }
    }
    catch(e){
        res.json({msg:"Something Went Wrong"});
    }
});


app.get("/product",async(req,res)=>{
    try{
        const re=await productmodel.find();
        res.json(re);
    }
    catch(e){
        res.json({msg:"Error in Record Get"});
    }

});

app.get("/product/:id",async(req,res)=>{
    try{
        const re=await productmodel.find({_id:req.params.id})
        res.json(re);
    }
    catch(e){
        res.json({msg:"Error in Record Get"});
    }

});

app.delete("/product",async(req,res)=>{
    try{
    const re=await productmodel.findOneAndDelete({_id:req.body.rid})
        res.json({msg:"Record Delete"})
    }
    catch(e){
        res.json({msg:"Error in Record Delete"});
    }
});




app.post("/addcart",async(req,res)=>{
    try{
        const rec=new addtocart({
            productname:req.body.prod,
            price:req.body.pri,
            offerprice:req.body.ofpr,
            pic:req.body.img,
            mobile:req.body.mobi,
            quantity:req.body.qnty
        });
        if(rec.save()){
            res.json({msg:"Record Saved"});
        }
        else{
            res.json({msg:"Record Not Saved"});
        }
    }
    catch{
        res.json({msg:"Error in Record Saved"});
    }
});


app.get("/addcart/:id",async(req,res)=>{
    try{
        
        const re=await addtocart.find({mobile:req.params.id});
        res.json(re);
    }
    catch{
        res.json({msg:"Record Not Get"});
    }
});



app.get("/addcart",async(req,res)=>{
    try{
        
        const re=await addtocart.find();
        res.json(re);
    }
    catch{
        res.json({msg:"Record Not Get"});
    }
});





app.put("/addcart",async(req,res)=>{
    try{
        var qty=parseInt(req.body.quantity)
        const re=await addtocart.findOneAndUpdate({_id:req.body.rid},{quantity:qty});
        res.json({msg:"Record Updated"});
    }
    catch{
        res.json({msg:"Record Not Updated"});
    }
})

app.delete("/addcart",async(req,res)=>{
    try{
        var qty=parseInt(req.body.quantity)

        const re=await addtocart.findOneAndDelete({_id:req.body.rid},{quantity:qty});
        res.json({msg:"Record Deleted"});
    }
    catch{
        res.json({msg:"Record Not Deleted"});
    }
})

app.post("/order",async(req,res)=>{
   
        var dt=new Date();
        var ordno="Ord-" + dt.getDate() + dt.getMonth() + dt.getFullYear() + dt.getMilliseconds();
    const rec=new myorder({
        orderno:ordno,
        total:req.body.total,
        discount:req.body.dis,
        amountpay:req.body.pay,
        candidate:req.body.name,
        mobile:req.body.mob,
        address:req.body.add,
        status:"Pending",
        orddate:dt.getDate() + "-" + dt.getMonth() + "-" + dt.getFullYear()
    });
    const data=rec.save();
    if(data){
       const pdata=await addtocart.find({mobile:req.body.mob})
       for(var i=0;i<pdata.length;i++)
       {
            var odt=new orderdetails({orderno:ordno, productname:pdata[i].productname, price:pdata[i].price, pic:pdata[i].pic, offerprice:pdata[i].offerprice, quantity:pdata[i].quantity});
            await odt.save();
       }
        await addtocart.deleteMany({mobile:req.body.mob});
        res.json({msg:"Your Order Successful"});
    }
    else{
        res.json({msg:"Record Not Saved"});
    }
});

app.put("/order",async(req,res)=>{
    try{
        const re=await myorder.findOneAndUpdate({_id:req.body.rid},{status:req.body.status});
        res.json({msg:"Record Updated"});
    }
    catch{
        res.json({msg:"Record Not Updated"});
    }
})


app.get("/order/:id",async(req,res)=>{
    try{
    const re=await myorder.find({mobile:req.params.id});
        res.json(re);
    }
    catch{
        res.json({msg:"Record Not Get"});
    }

})

app.post("/order/:id",async(req,res)=>{
    try{
    const re=await myorder.find({_id:req.params.id});
        res.json(re);
    }
    catch{
        res.json({msg:"Record Not Get"});
    }

})

app.get("/orderdetails/:id",async(req,res)=>{
    try{
        
        const re=await orderdetails.find({orderno:req.params.id});
        res.json(re);
    }
    catch{
        res.json({msg:"Record Not Get"});
    }
});


app.get("/order",async(req,res)=>{
    try{
    const re=await myorder.find();
        res.json(re);
    }
    catch{
        res.json({msg:"Record Not Get"});
    }
})

app.post("/probysearch/:id",async(req,res)=>{
    
        var s=req.params.id;
        const re=await productmodel.find({productname:{$regex:s, $options: 'i'}});
        res.json(re);
    
})



const mystorage1=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./propics1');
    },
    filename:(req,file,cb)=>{
        const ext=file.mimetype.split('/')[1];
        cb(null,"pic_"+Date.now()+"."+ext);
    }
});


const myfilter1=(req,file,cb)=>{
    const ext=file.mimetype.split('/')[1];
    if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="bmp")
    {
        cb(null,true);
    }
    else{
        cb("Please select valid image",false);
    }
}

const uploaded=multer({
    storage:mystorage1,
    fileFilter:myfilter1
});


app.post("/multipic",uploaded.single("multi_pic"),async(req,res)=>{
    try{
        const rec=new multipicmodel({
            picid:req.body.id,
            picture:req.file.filename
        });
        if(rec.save()){
            res.json({msg:"Record Saved"});
        }
        else{
            res.json({msg:"Record Not Saved"});
        }
    }
    catch{
        res.json({msg:"Error in Record Saved"});
    }
})

app.get("/multipic",async(req,res)=>{
    try{
    const re=await multipicmodel.find();
        res.json(re);
    }
    catch{
        res.json({msg:"Record Not Get"});
    }
})

app.get("/multipic/:id",async(req,res)=>{
    try{
    const re=await multipicmodel.find({_id:req.params.id});
        res.json(re);
    }
    catch{
        res.json({msg:"Record Not Get"});
    }
})

app.post("/multipicbypro",async(req,res)=>{
    try{
        const re=await multipicmodel.find({picid:req.body.picid})
        res.json(re);
    }
    catch{
        res.json({msg:"Error"})
    }
});



app.listen(7005,()=>{
    console.log("Server Started");
});