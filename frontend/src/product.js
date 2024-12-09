
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"


const Product = () => {
    const m = useNavigate("");


    const [b, setb] = useState("");
    const [c, setc] = useState("");
    const [d, setd] = useState("");
    const [e, sete] = useState("");
    const [f, setf] = useState("");
    const [g, setg] = useState("");

    const [cookie, setcookie, removecookies] = useCookies();
    const jump = useNavigate();
    useEffect(() => {
        if (!cookie["mycookie"]) {
            jump("/adminfront");
        }
    })

    const logout = () => {
        removecookies("mycookie");
        jump("/adminfront");
    }


    const [cdata, setcdata] = useState([]);

    const [ca, setca] = useState([]);
    const [cb, setcb] = useState([]);

    useEffect(() => {
        loadcategory();
        loadrecord();
        

    }, []);


    const fun1 = () => {
        m("/category");
    }
    const fun2 = () => {
        m("/subcategory");
    }
    const fun3 = () => {
        m("/product");
    }

    const orderdekho = () => {
        jump("/myorder");
    }

    const fun5 = (e) => {
        setb(e.target.value);
    }
    const fun6 = (e) => {
        setc(e.target.value);
    }
    const fun7 = (e) => {
        setd(e.target.value);
    }
    const fun8 = (e) => {
        sete(e.target.value);
    }
    const fun9 = (e) => {
        setf(e.target.value);
    }
    const fun10 = (e) => {
        setg(e.target.files[0]);
    }

    const newimage = (e) => {
        setmulti(e.target.files[0]);
    }




    const saverecord = async () => {

        if (b === "") {
            alert("Choose Subcategory ");
        }
        else if (c === "") {
            alert("Enter Product ");
        }
        else if (d === "") {
            alert("Enter Price");
        }
        else if (e === "") {
            alert("Enter Full offer price");
        }
        else if (f === "") {
            alert("Enter Description");
        }
        else if (g === "") {
            alert("Select Image");
        }

        else {
            var fdata = new FormData();
            fdata.append("subcat", b);
            fdata.append("pname", c);
            fdata.append("price", d);
            fdata.append("ofprice", e);
            fdata.append("des", f);
            fdata.append("pro_pic", g);
            const re = await fetch("http://127.0.0.1:7005/product", {
                method: "POST",
                body: fdata
            });
            const data = await re.json();
            alert(data.msg);
            loadrecord();
        }
    }
    const loadcategory = async () => {
        const re = await fetch("http://127.0.0.1:7005/category1",
            {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
        const data = await re.json();
        setca(data);
    }


    const loadsubcategory = async (s) => {
        const re = await fetch("http://127.0.0.1:7005/subcatbycat",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cid: s.target.value })

            });
        const data = await re.json();
        setcb(data);
        console.log(cb.length);
    }

    const loadrecord = async () => {
        const re = await fetch("http://127.0.0.1:7005/product", {
            method: "GET",
            headers: { "Content-Type": "Application/json" }
        });
        const data = await re.json();
        console.log("data");
        setcdata(data);

    }
    const deleteRecord = async (m) => {
        if (window.confirm("Sure! Want To Delete"));
        {
            const re = await fetch("http://127.0.0.1:7005/product", {
                method: "DELETE",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify({ rid: m })
            });
            const data = await re.json();
            alert(data.msg);
            loadrecord();
        }
    }

    const [multi, setmulti] = useState();
    const [id, setid] = useState();



    const saveimage = async () => {
        if (multi === "") {
            alert("Select Image");
        }

        else {
            var fdata = new FormData();
            fdata.append("id", id);
            fdata.append("multi_pic", multi);
            const re = await fetch("http://127.0.0.1:7005/multipic", {
                method: "POST",
                body: fdata
            });
            const data = await re.json();
            alert(data.msg);

        }
    }

    const [mpic, setmpic] = useState([]);

    const pic = async (e) => {
        const re = await fetch("http://127.0.0.1:7005/multipicbypro", {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body:JSON.stringify({picid:e})
        });
        const data = await re.json();
        setmpic(data);   
        setid(e);
        
    }

    return (

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

                    <div className="col-md-9 mt-3">

                        <div className="container-fluid text-end">
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                                Add New Product
                            </button>&nbsp;<button className="btn btn-warning" onClick={logout}>Logout</button><br /><br />
                        </div>
                        <div className="container-fluid">
                            <table className="table table-bordered">

                                <thead>
                                    <tr>

                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Offer Price</th>
                                        <th>Description</th>
                                        <th>pic</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cdata.map((x) => {
                                        return (
                                            <tr>

                                                <td>{x.productname}</td>
                                                <td>{x.price}</td>
                                                <td>{x.offerprice}</td>
                                                <td>{x.description}</td>
                                                <td><img style={{ width: "100px" }} onClick={() => { pic(x._id) }} data-bs-toggle="modal" data-bs-target="#myModal1" src={"http://127.0.0.1:7005/" + x.pic} /></td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => { deleteRecord(x._id) }}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>

                            </table>
                        </div>
                    </div>

                </div>
            </div>



            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Modal Product</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <label>Category</label><br />
                            <select onChange={loadsubcategory} className="form-control" >
                                <option>-Select Category-</option>
                                {ca.map((x) => {
                                    return (
                                        <option value={x._id}>{x.category}</option>
                                    )
                                })}
                            </select>

                            <label>Subcategory</label><br />
                            <select onChange={fun5} className="form-control">
                                <option>-Select Category-</option>
                                {cb.map((x) => {
                                    return (
                                        <option value={x._id}>{x.subcatname}</option>
                                    )
                                })}
                            </select>

                            <label>Product Name</label><br />
                            <input type="text" onChange={fun6} className="form-control"></input>


                            <label>Price</label><br />
                            <input type="text" onChange={fun7} className="form-control"></input>

                            <label>Offer Price</label><br />
                            <input type="text" onChange={fun8} className="form-control"></input>


                            <label>Description</label><br />
                            <textarea onChange={fun9}></textarea><br />

                            <label>Upload Your Image</label><br />
                            <input type="file" onChange={fun10} className="form-control"></input>
                        </div>



                        <div className="modal-footer">
                            <button type="button" onClick={saverecord} className="btn btn-danger">Save</button>
                        </div>

                    </div>

                </div>
            </div>





            <div className="modal" id="myModal1">
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h4 className="modal-title">Multi Images Upload</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>


                        <div className="modal-body">
                            <label>Upload New Image</label>
                            <input type="file" onChange={newimage} className="form-control"></input>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Picture</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mpic.map((x) => {
                                        return(
                                            <tr>
                                              <td>
                                                <img style={{width:"100px"}} src={"http://127.0.0.1:7005/" + x.picture}/>
                                              </td>
                                           </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>


                        <div className="modal-footer">
                            <button type="button" onClick={saveimage} className="btn btn-danger" >Save</button>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}
export default Product