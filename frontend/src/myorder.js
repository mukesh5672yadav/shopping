import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Topnav, { Bottomnav, Sidemenu } from "./component";

const Order = () => {

    const [order, setorder] = useState([]);
    const [cart, setcart] = useState([]);

    const[id,setid]=useState("");
    const[tdata,settdata]=useState("");
    const [cookie, setcookie, removecookie] = useCookies();


    const jump = useNavigate();
    useEffect(() => {
        loadorder();

        if (!cookie["mycookie"]) {
            jump("/adminfront");
        }
    }, []);




    const logout = () => {
        removecookie("mycookie")
        jump("/adminfront");

    }
    const loadorder = async () => {
        let m = cookie["mycookie"];
        const re = await fetch("http://127.0.0.1:7005/order", {
            method: "GET",
            headers: { "Content-Type": "Application/json" }
        });
        const data = await re.json();
        setorder(data)
    }


    const loaddetails = async (x) => {
        const re = await fetch("http://127.0.0.1:7005/orderdetails/" + x, {
            method: "GET",
            headers: { "Content-Type": "Application/json" }


        });
        const data = await re.json();
        setcart(data)
    }

    const track1=(e)=>{
        settdata(e.target.value);
    }
    const trackproduct = async () => {
        const re = await fetch("http://127.0.0.1:7005/order", {
            method: "PUT",
            headers: { "Content-Type": "Application/json" },
            body:JSON.stringify({rid:id, status:tdata})
        });
        const data = await re.json();
        alert(data.msg);
        
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row mt-3 ">
                    <div className="col-md-9 text-end">
                        <button className="btn btn-warning " onClick={logout}>Logout</button>

                    </div>
                    <div className="col-md-9 bg-dark mt-2"><br />
                        <table className="table table-bordered">
                            <thead>
                                <tr>

                                    <th>Name</th>
                                    <th>Mobile No</th>
                                    <th>Address</th>
                                    <th>Total Amount</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {order.map((x) => {
                                    return (
                                        <tr>
                                            <td>{x.candidate}</td>
                                            <td>{x.mobile}</td>
                                            <td>{x.address}</td>
                                            <td>{x.amountpay}/-</td>

                                            <td> <button type="button" onClick={() => { loaddetails(x.orderno) }} className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                                                Order Details
                                            </button>&nbsp;&nbsp;
                                                <button type="button" onClick={()=>{setid(x._id)}} class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#myModal1">
                                                    Status
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ width: "700px" }}>


                        <div className="modal-header">
                            <h4 className="modal-title">Order Details</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>


                        <div className="modal-body bg-dark">
                            <div className="container-fluid">
                                <table className="table table-bordered bg-dark">
                                    <thead>
                                        <tr>
                                            <th>Order No.</th>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Offer Price</th>
                                            <th>Pic</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((x) => {
                                            return (
                                                <tr>
                                                    <td>{x.orderno}</td>
                                                    <td>{x.productname}</td>
                                                    <td>{x.price}</td>
                                                    <td>{x.offerprice}</td>
                                                    <td><img style={{ width: "100px" }} src={"http://127.0.0.1:7005/" + x.pic} /></td>
                                                    <td>{x.quantity}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Back</button>
                        </div>

                    </div>
                </div>
            </div>





            <div class="modal" id="myModal1">
                <div class="modal-dialog">
                    <div class="modal-content">


                        <div class="modal-header">
                            <h4 class="modal-title">Order Status</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>


                        <div class="modal-body">
                            <input type="radio" onChange={track1} name="D" value="ORDERED"></input> ORDERED<br/>
                            <input type="radio" onChange={track1} name="D" value="PICKED"></input> PICKED<br/>
                            <input type="radio" onChange={track1} name="D" value="SHIPPED"></input> SHIPPED<br/>
                            <input type="radio" onChange={track1} name="D" value="DELIVERED"></input> DELIVERED

                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" onClick={trackproduct}>Save</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Order