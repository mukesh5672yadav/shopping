import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"


const Topnav = () => {
  const [cookie, setcookie, removecookie] = useCookies();
  const jump = useNavigate();

  const [no, setno] = useState();

  const [sdata, setsdata] = useState("");


  const fun1 = (e) => {
    setsdata(e.target.value);
  }

  const searchinp = () => {
    jump("/searchproduct/" + sdata);
  }

  const logout = () => {
    removecookie("mycookie1");
    jump("/website");
  }


  useEffect(() => {
    noofproduct();
  })

  const noofproduct = async () => {
    const m = cookie["mycookie1"]
    const re = await fetch("http://127.0.0.1:7005/addcart/" + m, {
      method: "GET",
      headers: { "Content-Type": "Application/json" }
    });
    const data = await re.json()
    setno(data.length);

  }


  return (
    <>
      <div className="container-fluid bg-black">
        <div className="row text-white">
          <div className="col-md-3 bg-primary">
            <h4 className="pt-2">Today's Special Offers !</h4>

          </div>&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="col-md-3">
            <form class="d-flex pt-1">
              <input class="form-control" type="text" onChange={fun1} placeholder="Search" autoFocus></input>
              <button class="btn btn-warning  bton" onClick={searchinp} type="button"><i class="fa fa-search text-white"></i></button>
            </form>
          </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="col-md-2">
            <Link to={"/cartadd"}><button className="btn btn-primary mt-1" >View Your Cart <i class="fa fa-shopping-cart"></i><sup className="rounded-circle bg-warning">{no}</sup> </button></Link>
          </div>
          <div className="col-md-1">

            <div className="dropdown">
              <i className="fa fa-user dropdown-toggle pt-3" data-bs-toggle="dropdown"></i>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/login">Login</Link></li>
                <li><Link className="dropdown-item" to="/signup">SignUp</Link></li>
                <li><Link className="dropdown-item" onClick={logout}>Logout</Link></li>
              </ul>
            </div>

          </div>
          <div className="col-md text-end ">
            <button className="btn btn-warning bton1">Contact</button>
          </div>
        </div>
      </div>

    </>
  )
}


const Bottomnav = () => {
  return (
    <>
      <div className="container-fluid shadow-sm p-4 mb-4 bg-white f1">
        <div className="row mt-3 ps-5" >
          <div className="col-md-4" style={{ paddingLeft: 150 }}>
            <h2 className="head11"><b className="bold11">C</b>orner <b className="bold12">Store</b></h2>
          </div>
          <div className="col-md-5">

            <ul className="nav">
              <li className="nav-item text-primary">
                <Link className="nav-link" to="/website">Home</Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link text-black" to="#">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black" to="#">Best Deals</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black" to="/usermyorder">My Order</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black" to="/trackingproduct">Track Order</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 pt-2">
            <i className="fa fa-phone icon1" areahidden="true"> (+91) 8604 428184</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i className="fa fa-envelope-o icon2">  store@corner.com</i>&nbsp;&nbsp;&nbsp;
            <i className="fa fa-moon-o" style={{ fontSize: 18 }}></i>
          </div>
        </div>
      </div>

    </>
  )
}


const Sidemenu = () => {
  const [cdata, setcdata] = useState([]);

  useEffect(() => {
    loadrecord();
  }, [])

  const loadrecord = async () => {
    const re = await fetch("http://127.0.0.1:7005/category1", {
      method: "GET",
      headers: { "Content-Type": "Application/json" }
    });
    const data = await re.json();
    setcdata(data);
  }
  return (
    <>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 ">

            <nav className="navbar navbar-expand-sm bg-light navbar-light">
              <div className="container-fluid">
                <a className="navbar-brand" href="#"></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-muted" id="collapsibleNavbar">
                  <ul className="navbar-nav nav flex-column">
                    {
                      cdata.map((x) => {
                        return (
                          <li className="nav-item ">
                            <Link className="nav-link  head50" to={"/shopproducts/" + x._id}>{x.category}</Link>

                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            </nav>
          </div>

        </div>
      </div>


    </>
  )
}


const Phone = (x) => {

  const [cookie, setcookie, removecookie] = useCookies();
  const jump = useNavigate();

  const AddCart = async (m1, m2, m3, m4) => {
    var mob = cookie["mycookie1"];
    var qty = "1";
    if (!cookie["mycookie1"]) {
      jump("/login");
    }
    else {
      const re = await fetch("http://127.0.0.1:7005/addcart", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ prod: m1, pri: m2, ofpr: m3, img: m4, mobi: mob, qnty: qty })
      });
      const data = await re.json();
      alert(data.msg);

    }

  }
  return (
    <>
      <div className="col-md-3">
        <img style={{ width: "200px", height: "250px" }} src={"http://127.0.0.1:7005/" + x.img}></img>
        <br /><br />
        <h4> {x.pname}</h4>
        <label>Price {x.pr} </label>&nbsp;&nbsp;&nbsp;&nbsp;Offer&nbsp;<del> {x.ofpr}</del><br /><br />
        <button className="btn btn-warning" onClick={() => { AddCart(x.pname, x.pr, x.ofpr, x.img) }}>ADD TO CART</button><br />
      </div>
    </>
  )
}

const Notfound = () => {
  return (
    <>
      <h1 className="text-center pt-5"><span >This Product Is Not Found</span></h1>
    </>
  )
}


export default Topnav
export { Bottomnav, Sidemenu, Phone, Notfound }