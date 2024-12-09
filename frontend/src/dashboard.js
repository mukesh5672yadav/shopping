import { useNavigate } from "react-router-dom"

const Dashboard=()=>{

    const m=useNavigate("");
   
    const fun1=()=>{
        m("/category");
    }
    const fun2=()=>{
        m("/subcategory");
    }
     const fun3=()=>{
        m("/product");
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
                    <h2 className="head2">Home</h2>
                    <h2 className="head2">About</h2>
                    <h2 className="head2">Exit</h2>
                    
                </div>
            </div>
         </div>
        </>
    )
}
export default Dashboard 