import { useEffect, useState } from "react"
import Topnav, { Bottomnav, Phone, Sidemenu } from "./component"
import { useParams } from "react-router-dom";

const Shopproducts=()=>{
    const {id}=useParams();
    const [cdata,setcdata]=useState([]);
    const [pdata,setpdata]=useState([]);

    useEffect(()=>{
        loadsubcat();
    },[])

    const loadsubcat=async()=>{
        const re=await fetch("http://127.0.0.1:7005/subcatbycat",{
            method:"POST",
            headers:{"Content-Type":"Application/json"},
            body:JSON.stringify({cid:id})
        });
        const data=await re.json();
        setcdata(data);
        
    }

    const getProduct=async(p)=>{
        const re=await fetch("http://127.0.0.1:7005/probycat",{
            method:"POST",
            headers:{"Content-Type":"Application/json"},
            body:JSON.stringify({scid:p})
        });
        const data=await re.json();
        setpdata(data);
        console.log(pdata.length); 

    }
    return(
        <>
            <Topnav />
            <Bottomnav />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <ul style={{listStyle:"none"}}>
                            {
                                cdata.map((x)=>{
                                    return(
                                        <li style={{cursor:"pointer"}} onClick={()=>{getProduct(x._id)}}>{x.subcatname}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            {
                                pdata.map((x)=>{
                                    return(
                                        
                                        <Phone pr={x.price} img={x.pic} pname={x.productname} ofpr={x.offerprice}/>
                                        
                                        
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Shopproducts