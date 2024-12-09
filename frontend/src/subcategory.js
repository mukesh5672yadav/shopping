
import {useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"

const Subcategory=()=>{

    const [a,seta]=useState("");
    const [b,setb]=useState("");
    const [cookie,setcookie,removecookies]=useCookies();
    const jump=useNavigate();

    const [cdata,setcdata]=useState([]);
    const [ca,setca]=useState([]);
    useEffect(()=>{                                               //useEffect onload ki jaise work krta hai 
        loadrecord();
        loadcategory();
    },[])

    const m=useNavigate();

    const orderdekho=()=>{
        jump("/myorder");
    }

    const fun1=()=>{
        m("/category");
    }
    const fun2=()=>{
        m("/subcategory");
    }
    const fun3=()=>{
        m("/product");
    }

    const fun4=(e)=>{
        seta(e.target.value);
    }
    const fun5=(e)=>{
        setb(e.target.value);
    }

    const saverecord=async()=>{
        if(a===""){
            alert("Please Select Category");
        }
        else if(b===""){
            alert("Please Enter Subcategory");
        }
        else{
            const re=await fetch("http://127.0.0.1:7005/subcategory",{
                method:"POST",
                headers:{"Content-Type":"Application/json"},
                body:JSON.stringify({id:a,catname:b})
            });
            const data=await re.json();
            alert(data.msg);
            loadrecord();
        }
    }
    const loadrecord=async()=>{
        const re=await fetch("http://127.0.0.1:7005/subcategory",
        {method:"GET",
        headers:{"Content-Type":"Application/json"}
        });
        const data=await re.json();
        console.log("data");
        setcdata(data);
    }

    const loadcategory=async()=>{
        const re=await fetch("http://127.0.0.1:7005/category1",
        {method:"GET",
        headers:{"Content-Type":"application/json"}
        });
        const data=await re.json();
        setca(data);
    }
    
    const deleteRecord=async(m)=>{
        if(window.confirm("Want to Delete"))
        {
            const re=await fetch("http://127.0.0.1:7005/subcategory",{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({rid:m})
            });
            const data=await re.json();
            alert(data.msg);
            loadrecord();
        }
    }

    useEffect(()=>{
        if(!cookie["mycookie"])
        {
            jump("/adminfront");
        }
       });
    const logout=()=>{
       
            removecookies("mycookie")
            jump("/adminfront");
        
    }
    return(
        <>
            <div className="container-fluid">
                <div className="row bg-info">
                    <div className="col-md-2 bg-warning">

                    <h1 className="head1">Dashboard</h1>
                    <h2 className="head2" onClick={fun1}>Category</h2>
                    <h2 className="head2" onClick={fun2}>Sub Category</h2>
                    <h2 className="head2" onClick={fun3}>Product</h2>
                    <h2 className="head2" onClick={orderdekho}>My Order</h2>
                    <h2 className="head2">About</h2>
                    <h2 className="head2">Exit</h2>



                    </div>
                    <div className="col-md-9  mt-3">

                        <div className="container-fluid text-end">
                          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                          Subcategory
                          </button>&nbsp;<button className="btn btn-warning" onClick={logout}>Logout</button><br/><br/>
                        </div>

                    
                        <div className="container-fluid">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Cat Id</th>
                                    <th>subcatname</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        <tbody>
                         {cdata.map((x)=>{
                             return(
                                 <tr>
                                   <td>{x.catid}</td>
                                   <td>{x.subcatname}</td>
                                   
                                   <td>
                                   <button className="btn btn-danger" onClick={()=>{deleteRecord(x._id)}}>Delete</button></td>
                                 </tr>
                             )
                         })}
            
                       </tbody>
                      </table>
                      </div>

                    

                          <div className="modal" id="myModal">
                            <div className="modal-dialog">
                              <div className="modal-content">

                                <div className="modal-header">
                                  <h4 className="modal-title">Modal Heading</h4>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body">
                                  <label>Category</label><b/>
                                  <select onChange={fun4} className="form-control">
                                    <option  value="select">-Select category-</option>
                                    {ca.map((x)=>{
                                            return(
                                                <option value={x._id}>{x.category}</option>
                                            )
                                    })}
                                  </select>
                                </div>
                                <div className="container-fluid">
                                  <label>Subcategory</label><br/>
                                  <input type="text" onChange={fun5} className="form-control"></input>

                                </div>

                                <div className="modal-footer">
                                  <button type="button" onClick={saverecord} className="btn btn-danger">OK</button>
                                </div>

                              </div>
                            </div>
                          </div>

                        
                        </div>
                      </div>
                    </div>
        </>
    )
}
export default Subcategory