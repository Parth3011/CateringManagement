import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/login.css';
// import { useEffect } from 'react';

import axios from 'axios';

export default function Login({UserData}) {

  const navigate = useNavigate();
  // const [flag,setFlag] = useState("false");
  
  const data ={email:"",pass:""};
  const [inputdata,setinputData] = useState(data);

  // useEffect(()=>{
  //   axios.get("")
  //   .then((resp)=>{
  //     console.log(resp);
  //   })
  // },[]);

  const handledata = (e)=>{
    setinputData({...inputdata,[e.target.name]:e.target.value});
  }

  const handlesubmit =  (e) => {
    e.preventDefault();
    try {
       axios.post('http://localhost:7000/api/login', inputdata)
      .then((resp) => {
        // console.log(resp)
        console.log(resp);
        if(resp.data.user.role==='customer'){
          console.log(true);
          navigate('/customer')
        }
        if(resp.data.user.role==='admin'){
          console.log(true);
          navigate('/admin')
        }
        if(resp.data.user.role==='caterer'){
          console.log(true);
          navigate('/caterer')
        }
        // console.log(resp.data.user.role)
        console.log(resp.data.user);
        UserData(resp.data.user);
        console.log(resp.data.user);
      })
      // .then((err) => console.log(err))
    } catch (e) {
      console.error('Error submitting form:', e);
      alert('An error occurred while submitting the form');
    }
  };

  return (
    <div>
      <div style={{backgroundColor:"black",height:"50px"}}>Login</div>
    <div className='container'>
      <section className="">
        <div className="">
          <div className="row d-flex justify-content-center align-items-center h-50">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src="https://media.istockphoto.com/id/650655146/photo/catering-food-wedding-event-table.jpg?s=612x612&w=0&k=20&c=ATGYgW8bM_559jJ5aUNO4HlJqpkOWUmNNMMflx5kajo="
                      alt="login form" className="img" style={{ borderRadius: "1rem 0 0 1rem" }} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">

                      <form>

                        <div className="d-flex align-items-center mb-3 pb-1">
                          < img alt="logo" className="logo" src='https://www.shutterstock.com/shutterstock/photos/1984672004/display_1500/stock-vector-catering-quality-food-design-premium-logo-1984672004.jpg' />
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example17">Email address</label>
                          <input type="email" id="form2Example17" className="form-control form-control-lg" name="email" value={inputdata.email} onChange={handledata} />
                        </div>

                          <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example27">Password</label>
                          <input type="password" id="form2Example27" className="form-control form-control-lg" name="pass" value={inputdata.pass} onChange={handledata} />
                        </div>


                          <div className="pt-1 mb-4">
                            <button className="bg-black btn btn-dark btn-lg btn-block" type="button" onClick={handlesubmit}>Login</button><br />


                            <Link className="small text-muted" to="/forgetpassword">Forgot password?</Link>
                          </div><br />


                          <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>Don't have an account?
                            <Link to="/signup1" style={{ color: "#393f81" ,marginLeft:"10px"}}>Register Caterer</Link>
                            <Link to="/signup2" style={{ color: "#393f81", marginLeft: "33px" }}>Register Customer</Link>
                            {/* <Link to="/signupadmin" style={{ color: "#393f81", marginLeft: "33px" }}>Register admin</Link> */}
                          </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Outlet /> */}
    </div>
    </div>
  )
}

