import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Cart=()=>{
    const [p,setp]=useState();
    const [ofp,setofp]=useState();
    const [pic,setpic]=useState();
    const [pro,setpro]=useState();

    const [cookie,setcookie,removecookies]=useCookies();
    const jump=useNavigate();
    useEffect(()=>{
        if(!cookie["mycookie1"]){
            jump("/login");
        }
    })

    const fun1=(e)=>{
        setp(e.target.value);
    }
    const fun2=(e)=>{
        setofp(e.target.value);
    }
    const fun3=(e)=>{
        setpic(e.target.files[0]);
    }
    const fun4=(e)=>{
        setpro(e.target.value);
    }

    const save=async()=>{
        if(p===""){
            alert("Please Enter Price");
        }
        else if(ofp===""){
            alert("Please Enter Offer Price");
        }
        else if(pic===""){
            alert("Select Picture");
        }
        else if(pro===""){
            alert("Please Enter Product Name");
        }
        else{
            var fdata=new FormData();
            fdata.append("pri",p);
            fdata.append("ofpr",ofp);
            fdata.append("prod",pro);
            fdata.append("pro_pic1",pic);
            const re=await fetch("http://127.0.0.1:7005/cart",{
                method:"POST",
                body:fdata
            });
            const data=await re.json();
            alert(data.msg);
        }
    }
    return(
        <>
            <div className="container-fluid">
                <label>Price</label>
                <input type="number" onChange={fun1} className="form-control"></input>
                <label>Offer Price</label>
                <input type="number" onChange={fun2} className="form-control"></input>                
                <label>Product Name</label>
                <input type="text" onChange={fun4} className="form-control"></input>
                <label>Pic Name</label>
                <input type="file" onChange={fun3} className="form-control"></input>
                <br/>
                <button className="btn btn-danger" onClick={save}>Save</button>            
            </div>
        </>
    )
}
export default Cart