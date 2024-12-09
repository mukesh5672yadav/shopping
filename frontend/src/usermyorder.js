
import { useEffect, useState } from "react";
import Topnav, { Bottomnav } from "./component"
import { useCookies } from "react-cookie";

const Myorder = () => {

    const [order, setorder] = useState([]);
    const [cart, setcart] = useState([]);

    const[st2,setst2]=useState("step-wizard-item current-item");
    const[st3,setst3]=useState("step-wizard-item");
    const[st4,setst4]=useState("step-wizard-item");

    const [cookie, setcookie, removecookie] = useCookies();

    useEffect(() => {
        loadorder();
    })

    const loadorder = async () => {
        let m = cookie["mycookie1"];
        const re = await fetch("http://127.0.0.1:7005/order/" + m, {
            method: "GET",
            headers: { "Content-Type": "Applicatio/json" }
        })
        const data = await re.json();
        setorder(data);
    }

    const loaddetails = async (x) => {
        const re = await fetch("http://127.0.0.1:7005/orderdetails/" + x, {
            method: "GET",
            headers: { "Content-Type": "Application/json" }
        });
        const data = await re.json();
        setcart(data)
    }

    const funtrack=(x)=>{
        if(x==="PICKED"){
           setst2("step-wizard-item current-item");
           setst3("step-wizard-item");
           setst4("step-wizard-item");
        }

        else if(x==="SHIPPED"){
            setst2("step-wizard-item ");
           setst3("step-wizard-item current-item");
           setst4("step-wizard-item");
        }
        else if (x==="DELIVERED"){
            setst2("step-wizard-item");
           setst3("step-wizard-item");
           setst4("step-wizard-item");
        }
    }

    return (
        <>
            <Topnav />
            <Bottomnav />

            <div className="container-fluid">
                <div className="col-md-9">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Mobile</th> 
                                <th>Address</th>
                                <th>Amount Pay</th>
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
                                        <td> <button type="button" onClick={() => { loaddetails(x.orderno) }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                                            Order Details
                                        </button>&nbsp;&nbsp;

                                            <button type="button" class="btn btn-outline-danger" onClick={() => { funtrack(x.status) }} data-bs-toggle="modal" data-bs-target="#myModal1">
                                                Track Order
                                            </button>
                                        </td>
                                    </tr>
                                )

                            })}
                        </tbody>
                    </table>


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
                                    <button type="button" className="btn btn-danger">Close</button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>




            <div class="modal" id="myModal1">
                <div class="modal-dialog">
                    <div style={{ width: "750px" }} class="modal-content">


                        <div class="modal-header border-0">
                            <h4 class="modal-title">ORDER TRACKING</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>


                        <div class="modal-body">
                            <section className="step-wizard">
                                <ul className="step-wizard-list">
                                    <li className="step-wizard-item">
                                        <span className="progress-count">1</span>
                                        <span className="progress-label">Ordered</span>
                                    </li>
                                    <li className={st2}>
                                        <span className="progress-count">2</span>
                                        <span className="progress-label">Picked</span>
                                    </li>
                                    <li className={st3}>
                                        <span className="progress-count">3</span>
                                        <span className="progress-label">Shipped</span>
                                    </li>
                                    <li className={st4}>
                                        <span className="progress-count">4</span>
                                        <span className="progress-label">Delevered</span>
                                    </li>
                                </ul>
                            </section>
                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Myorder