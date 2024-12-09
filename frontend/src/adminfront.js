import { useState } from "react"
import { useNavigate } from "react-router-dom";
import {useCookies} from 'react-cookie'


const Admin=()=>{

    const[a,seta]=useState("");
    const[b,setb]=useState("");

    const m=useNavigate("");
    const [cookie,setcoookie,removecookie]=useCookies();

    const fun1=(e)=>{
        seta(e.target.value);
    }
    const fun2=(e)=>{
        setb(e.target.value);
    }
    const saverecord=async()=>{
        if(a==="")
        {
          alert("Please Enter Mobile");
        }
        else if(b==="")
        {
          alert("Please enter Password");
        }
        else{
            const re=await fetch("http://127.0.0.1:7005/admin1",{
                method:"POST",
                headers:{"Content-Type":"Application/json"},
                body:JSON.stringify({m:a, p:b}),
                credentials:"include"
            });
            const data=await re.json();
            if(data.msg==="Valid User")
            {
                setcoookie("mycookie",a);
               m("/category");
            }
            else{
               alert("Invalid User");
            }
        }
    }

    return(
        <>
            <div className="container">
                <label>Mobile</label>
                <input type="text" onChange={fun1} className="form-control"></input>

                <label>Password</label>
                <input type="Password" onChange={fun2} className="form-control"></input><br/>
                <button className="btn btn-info" onClick={saverecord}>Login</button>
            </div> 
                      
        </>
    )
}
export default Admin