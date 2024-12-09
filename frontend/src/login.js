import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login=()=>{

    const [m,setm]=useState();
    const [p,setp]=useState();
    const jump=useNavigate();


    const [cookie,setcookie,removecookies]=useCookies();
   


    const fun1=(e)=>{
        setm(e.target.value);
    }
    const fun2=(e)=>{
        setp(e.target.value);
    }

    const save=async()=>{
        if(m===""){
            alert("Please Enter Mobile");
        }
        else if(p===""){
            alert("Please Enter Password");
        }
        else{
            const re=await fetch("http://127.0.0.1:7005/login",{
                method:"POST",
                headers:{"Content-Type":"Application/json"},
                body:JSON.stringify({mob:m, psw:p}),
                credentials:"include"
            });
            const data=await re.json();
            if(data.msg==="Valid User")
            {
                setcookie("mycookie1",m);
                jump("/website");
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
                <input type="number" onChange={fun1} className="form-control"></input>
                <label>Password</label>
                <input type="password" onChange={fun2} className="form-control"></input><br/>
                <button className="btn btn-danger" onClick={save}>Login</button>
            </div> 
        </>
    )
}

export default Login