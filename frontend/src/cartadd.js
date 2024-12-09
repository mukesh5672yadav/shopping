import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Topnav, { Bottomnav } from "./component";

const Cartadd=()=>{
    
    const [ac,setac]=useState([]);
    const [tot,settot]=useState();
    const [tot1,settot1]=useState();
    const [totpay,settotpay]=useState();

   
    const [cname,setcname]=useState("");
    const [mobile,setmobile]=useState("");
    const [address,setaddress]=useState();



    const [cookie,setcookie,removecookie]=useCookies();

    const jump=useNavigate();
    useEffect(()=>{
        if(!cookie["mycookie1"]){
            jump("/login");
        }
    })
    useEffect(()=>{
        loadaddcart();
       
    },[]);  

   const Goback=()=>{
    jump("/website");
   }

  
    const fun4=(e)=>{
    setcname(e.target.value);
   } 
  
   const fun6=(e)=>{
    setaddress(e.target.value);
   }

    const loadaddcart=async()=>{
        let m=cookie["mycookie1"];
        const re=await fetch("http://127.0.0.1:7005/addcart/"+m,{
            method:"GET",
            headers:{"Content-Type":"Application/json"},
        })
        const data=await re.json();
        var temp=0;
        for(var i=0;i<data.length;i++)
        {
            temp=temp+ parseFloat(data[i].price)*parseInt(data[i].quantity)
        }

        var temp1=0;                                     //use for discount
        for(var i=0;i<data.length;i++)
        {
            temp1=temp1+ parseFloat(data[i].offerprice) * parseInt(data[i].quantity)
        }

        var temp2=0;
        for(var i=0;i<data.length;i++)
        {
            temp2=parseFloat(temp)-parseFloat(temp1)
        }

        settot(temp);
        settot1(temp1);
        settotpay(temp2);
        setac(data);
        loadaddcart();
    }
    const increment=async(e,q)=>{
        const str=parseInt(q)+1;
        const re=await fetch("http://127.0.0.1:7005/addcart",{
            method:"PUT",
            headers:{"Content-Type":"Application/json"},
            body:JSON.stringify({quantity:str, rid:e})

        })
        const data=await re.json();
        //alert(data.msg);
        
    }
    const decrement=async(e,q)=>{
        const str=parseInt(q)-1;
        if(str===0)
        {
            const re=await fetch("http://127.0.0.1:7005/addcart",{
            method:"DELETE",
            headers:{"Content-Type":"Application/json"},
            body:JSON.stringify({quantity:str, rid:e})

        })

    }
    else{
        const re1=await fetch("http://127.0.0.1:7005/addcart",{
            method:"PUT",
            headers:{"Content-Type":"Application/json"},
            body:JSON.stringify({quantity:str, rid:e})
         });

        const data=await re1.json();
        //alert(data.msg);
        }
        
    }

    const saveorder=async()=>{
        if(cname===""){
            alert("Please Enter Candidate Name");
        }
       
        else if(address===""){
            alert("Please Enter Address");
        }
        else{
            const re=await fetch("http://127.0.0.1:7005/order",{
                method:"POST",
                headers:{"Content-Type":"Application/json"},
                body:JSON.stringify({total:tot, dis:tot1, pay:totpay, name:cname, mob:cookie["mycookie1"], add:address})
            });
            const data=await re.json();
            alert(data.msg);
        }
    }

       
    // for date
    let d=new Date(); 
    let cday= d.getDate()
    let cmonth=d.getMonth()+1
    let cyear=d.getFullYear()

    
    return(
        <>
        <Topnav />
        <Bottomnav />
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-7">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Offer Price</th>
                                    <th>Mobile</th>
                                    <th>Pic</th>
                                    <th>Quantity</th>
                                    <th>Add Items</th>
                                </tr>
                            </thead>
                            <tbody>
                               {ac.map((x)=>{
                                return(
                                    <tr>
                                        <td>{x.productname}</td>
                                        <td>{x.price}</td>
                                        <td>{x.offerprice}</td>
                                        <td>{x.mobile}</td>
                                        <td><img style={{width:"100px"}} src={"http://127.0.0.1:7005/"+x.pic}/></td>
                                        <td>{x.quantity}</td>
                                        <td>
                                            <button className="btn btn-info" onClick={()=>{increment(x._id,x.quantity)}}>+</button>&nbsp;
                                            <button className="btn btn-danger" onClick={()=>{decrement(x._id,x.quantity)}}>-</button>
                                        </td>
                                    </tr>
                                )
                               })}
                            </tbody>
                        </table>
                    <button className="btn btn-warning" onClick={Goback}>Continue Shopping</button>&nbsp;&nbsp;
                    

                    </div>
                    <div className="col-md-5 border">
                        <h4>Total: {tot }</h4>
                        <h4>Discount: -{tot1 }</h4>
                        <h4>Delivery fees: <del>40</del> Free</h4>
                        <hr/>
                        <h4>Total Amount Pay: {totpay }/-</h4>
                        <h5>Candidate Name</h5>
                        <input type="text" onChange={fun4}  className="form-control" placeholder="Enter Candidate Name"></input>
                        <h5>Mobile No.</h5>
                        <input type="number"  value={cookie["mycookie1"]}  className="form-control" placeholder="Enter Your Mobile Number"></input>
                        <h5>Address</h5>
                        <textarea type="text" onChange={fun6} className="form-control" placeholder="Fill Your Address"></textarea><br/>

                        <h4>Status: </h4>
                                  
                        <h4>Date: {cday + "/" + cmonth +"/"+ cyear} </h4>
                        <br/>
            
                        <button className="btn btn-primary" onClick={saveorder}>Place Order</button><br/><br/>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Cartadd