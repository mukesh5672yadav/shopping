import { Link } from "react-router-dom"
import Topnav, { Bottomnav, Sidemenu } from "./component"


const Website=()=>{
    return(
        <>
            <Topnav />
            <Bottomnav/>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Sidemenu />
                        
                    </div>
                    
                      
                    <div className="col-md-9">

                      <div id="demo" class="carousel slide" data-bs-ride="carousel">

                        
                        <div class="carousel-indicators">
                          <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                          <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                          <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                        </div>


                        <div class="carousel-inner">
                          <div class="carousel-item active">
                            <img src={require("./image/spoon msala.jpg")} alt="Los Angeles" class="d-block w-100 img1"></img>
                            <div class="carousel-caption text-start">
                              <div className="container-fluid">
                                <div className="row">
                                  <div className="col-md-12 mb-3">
                                     <h1><b>Stay Home & Get</b></h1>
                                     <h1><b>Your Daily</b></h1>
                                     <h1>Need's</h1><br/>
                                      <button className="btn btn-warning">Shop Now</button>
                                  </div>
                                </div>

                              </div>
                              
                            </div>                           
                          </div>
                          <div class="carousel-item">
                            <img src={require("./image/catorymasala.jpg")} alt="Chicago" class="d-block w-100 img1"></img>
                            <div className="carousel-caption text-start">
                              <div className="container-fluid">
                                <div className="row">
                                  <div className="col-md-12 text-black">
                                     <h1><b>Make Your</b> </h1>
                                     <h1><b>Food </b></h1>
                                     <h1>With Spicy</h1><br/>
                                      <button className="btn btn-warning">Shop Now</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          
                          </div>
                          <div class="carousel-item">
                            <img src={require("./image/chikenmasala.webp")} alt="New York" class="d-block w-100 img1"></img>
                            <div className="carousel-caption text-start">
                              <div className="container-fluid">
                                <div className="row">
                                  <div className="col-md-12">
                                     <h1><b>Compare & Save </b></h1>
                                     <h1 className="text-warning"><b>30% Money</b></h1><br/><br/>
                                      <button className="btn btn-warning">Shop Now</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                        <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                          <span class="carousel-control-prev-icon"></span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                          <span class="carousel-control-next-icon"></span>
                        </button>
                        </div>
                   </div>
                </div>
            </div>


            <div className="container-fluid">
              <div className="row mt-5">
                <div className="col-md-2"></div>
                <div className="col-md-3 text-end  r1"><br/><br/><br/><br/>
                  <b>Discount Offer</b>
                  <h5><b className="text-primary">20%</b></h5>
                </div>
                <div className="col-md-3 ms-4 r2">
                  <h4><b>Introducing</b></h4>
                  <h5 className="text-end text-primary"><b>Best Store</b></h5><br/><br/>
                  <h5><b>For</b><b className="text-danger"> GROCERIS</b></h5>
                </div>
                <div className="col-md-3 ms-4 r3">
                  <br/><br/><br/><br/>
                  <h4><b>SAVE</b></h4>
                  <h3 className="text-danger"><b>Upto</b></h3>
                  <h5><b>$10</b></h5>
                </div>
              </div><br/><br/>
            </div>

           
          <div className="container-fluid mt-5">
            <h1 className="text-center">Your Daily Staples</h1>
            <div className="row mt-5">
                    
                <div className="col-md-2"></div>
                    <div className="col-md-2 rower1">
                        <img className="basmati ps-5" src={require('./image/basmatirice.png')}></img>
                        <br/><br/> 
                        <center><b>Basmati Rice (5 kg)</b><br/>
                        <label>$11.99 </label>&nbsp;&nbsp;&nbsp;&nbsp;<del>  $10</del></center><br/>
                        <Link to="#"><center><button className="btn btn-info">ADD TO CART</button></center><br/></Link>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="col-md-2 rower1">
                        <img className="basmati ps-5" src={require('./image/colddrink.png')}></img>
                        <br/><br/> 
                        <center><b>Cold Drink (2 Ltr)</b><br/>
                        <label>$8.99 </label>&nbsp;&nbsp;&nbsp;&nbsp;<del>  $10</del></center><br/>
                        <Link to="#"> <center><button className="btn btn-info">ADD TO CART</button></center></Link><br/>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="col-md-2 rower1">
                        <img className="basmati ps-5" src={require('./image/dog food.png')}></img>
                        <br/><br/> 
                        <center><b>Dogs Food (4 kg)</b><br/>
                        <label>$9.5 </label>&nbsp;&nbsp;&nbsp;&nbsp;<del>  $11</del></center><br/>
                        <Link to="#"><center><button className="btn btn-info">ADD TO CART</button></center></Link><br/>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="col-md-2 rower1">
                        <img className="basmati ps-5" src={require('./image/basmatirice.png')}></img>
                        <br/><br/> 
                        <center><b>Basmati Rice (5 kg)</b><br/>
                        <label>$11.99 </label>&nbsp;&nbsp;&nbsp;&nbsp;<del>  $10</del></center><br/>
                        <Link to="#"><center><button className="btn btn-info">ADD TO CART</button></center></Link><br/>
                    </div>

                </div>
                </div>


          
        
        </>
    )
}

export default Website