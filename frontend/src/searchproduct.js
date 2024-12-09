import { useParams } from "react-router-dom"
import Topnav, { Bottomnav, Notfound, Phone } from "./component"
import { useEffect, useState } from "react";

const Searchproduct=()=>{
    const {id}=useParams();
    const[pro,setpro]=useState([]);

    useEffect(()=>{
        getdata();
    },[id])

    const getdata=async()=>{
        const re=await fetch("http://127.0.0.1:7005/probysearch/"+id,{
            method:"POST",
            headers:{"Content-Type":"Application/json"}
        })
        const data=await re.json();
        setpro(data);
        
        
    }
    return(
        <>
            <Topnav />
            <Bottomnav />
            <div className="container-fluid">
                <div className="row">
                {pro.length>0? pro.map((x)=>{
                return(
                    <Phone pr={x.price} img={x.pic} pname={x.productname} ofpr={x.offerprice}/>

                )
            }):<Notfound />
            }
                </div>
            </div>
           
        </>
    )
}

export default Searchproduct