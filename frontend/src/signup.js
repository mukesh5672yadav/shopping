import { useState } from "react"

const Signup=()=>{
    const [m,setm]=useState();
    const [p,setp]=useState();
    const [cpass,setcpass]=useState();


    const fun1=(e)=>{
        setm(e.target.value);
    }
    const fun2=(e)=>{
        setp(e.target.value);
    }
    const fun3=(e)=>{
        setcpass(e.target.value);
    }
    
    const saverecord=async()=>{
        const mobile=/^\d{10}$/;

        if(m===""){
            alert("Please Enter Mobile");
        }
        else if(!m.match(mobile)){
            alert("Please Enter valid Mobile");
        }
        else if(p===""){
            alert("Please Enter password");
        }
        else if(cpass!==p){
            alert("Enter Correct Confirm Password");
        }
        
        else{
            const re=await fetch("http://127.0.0.1:7005/signup",{
                method:"POST",
                headers:{"Content-Type":"Application/json"},
                body:JSON.stringify({mob:m, psw:p})
            });
            const data=await re.json();
            alert(data.msg);
        }
    }
    return(
        <>
        
            <div className="container bg-dark text-white"><br/>
                <label>Mobile</label>
                <input type="number" onChange={fun1} className="form-control"></input>
                <label>Password</label>
                <input type="password" onChange={fun2} className="form-control"></input> 
                <label>Confirm Password</label>
                <input type="password" onChange={fun3}  className="form-control"></input><br/>
                <button className="btn btn-warning" onClick={saverecord}>Sign Up</button><br/><br/>
            </div>
        </>
    )
}

export default Signup