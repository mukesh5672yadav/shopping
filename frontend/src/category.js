import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie";

const Category = () => {

    const [a, seta] = useState("");

    const [m1, setm1] = useState("");

    const [cid, setcid] = useState("");
    const [cdata, setcdata] = useState([]);

    const jump = useNavigate();
    const [cookie, setcookie, removecookies] = useCookies();

    useEffect(() => {
        if (!cookie["mycookie"]) {
            jump("/adminfront");
        }
    });



    useEffect(() => {                                               //useEffect onload ki jaise work krta hai 
        loadrecord();
    }, [])


    const m = useNavigate("");

    const orderdekho = () => {
        jump("/myorder");
    }

    const fun1 = () => {
        m("category");
    }
    const fun2 = () => {
        m("/subcategory");
    }
    const fun3 = () => {
        m("/product");
    }
    const fun4 = (e) => {
        seta(e.target.value);
    }

    const fun6 = (e) => {
        setm1(e.target.value);
    }



    const saverecord = async () => {
        if (a === "") {
            alert("Please Enter Category");
        }

        else {
            const re = await fetch("http://127.0.0.1:7005/category1", {
                method: "POST",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify({ cat: a })
            });
            const data = await re.json();
            alert(data.msg);
        }
    }
    const loadrecord = async () => {
        const re = await fetch("http://127.0.0.1:7005/category1",
            {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
        const data = await re.json();
        console.log("data");
        setcdata(data);
    }
    const deleteRecord = async (m) => {
        if (window.confirm("Want to Delete")) {
            const re = await fetch("http://127.0.0.1:7005/category1", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rid: m })
            });
            const data = await re.json();
            alert(data.msg);
            loadrecord();
        }
    }

    const getRecord = async (m) => {
        const re = await fetch("http://127.0.0.1:7005/category1/" + m, {
            method: "GET",
            headers: { "Content-Type": "Application/json" },
        });
        const data = await re.json();
        setm1(data[0].category);
        setcid(m);

    }

    const updateRecord = async () => {
        const re = await fetch("http://127.0.0.1:7005/category1", {
            method: "PUT",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({ rid: cid, cat: m1 })
        });
        const data = re.json();
        alert(data.msg);
        loadrecord();
    }

    const logout = () => {
        removecookies("mycookie")
        jump("/adminfront");

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
                                Add New Category
                            </button>&nbsp;<button className="btn btn-warning" onClick={logout}>Logout</button><br /><br />
                        </div>


                        <div className="container-fluid">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cdata.map((x) => {
                                        return (
                                            <tr>
                                                <td>{x.category}</td>
                                                <td>
                                                    <button className="btn btn-warning" onClick={() => { getRecord(x._id) }} data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>&nbsp;&nbsp;&nbsp;
                                                    <button className="btn btn-danger" onClick={() => { deleteRecord(x._id) }}>Delete</button></td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div className="modal" id="myModal">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h4 className="modal-title">Modal Category</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body">
                                    <label>Category</label><b />
                                    <input type="text" onChange={fun4} className="form-control"></input>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" onClick={saverecord} className="btn btn-danger">Save</button>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </div>


            <div class="modal" id="editModal">
                <div class="modal-dialog">
                    <div class="modal-content">


                        <div class="modal-header">
                            <h4 class="modal-title">Edit Category</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>


                        <div class="modal-body">
                            <div>
                                <label>Category</label>
                                <input type="text" onChange={fun6} value={m1} className="form-control"></input>
                            </div>
                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" onClick={updateRecord}>Save</button>
                        </div>

                    </div>
                </div>
            </div>



        </>
    )
}
export default Category