import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/login.css';
import axios from 'axios';

export default function Login({ UserData }) {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({ email: "", pass: "" });
  const [errors, setErrors] = useState({ email: "", pass: "" });
  const [loginError, setLoginError] = useState("");

  const handleData = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    
    // Check for validation errors
    const errorsCopy = { ...errors };
    if (name === 'email') {
      if (!value) {
        errorsCopy.email = "Email is required";
      } else {
        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorsCopy.email = "Please enter a valid email address";
        } else {
          errorsCopy.email = "";
        }
      }
    } else if (name === 'pass') {
      if (value.length < 5) {
        errorsCopy.pass = "Password must be at least 5 characters long";
      } else {
        errorsCopy.pass = "";
      }
    }

    setErrors(errorsCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputData.email && inputData.pass) {
      try {
        axios.post('http://localhost:7000/api/login', inputData)
          .then((resp) => {
            if (resp.data.user.role === 'customer') {
              navigate('/customer')
            }
            if (resp.data.user.role === 'admin') {
              navigate('/admin')
            }
            if (resp.data.user.role === 'caterer') {
              navigate('/caterer')
            }
            UserData(resp.data.user);
          })
          .catch((error) => {
            console.error('Error submitting form:', error);
            alert("Email or password is incorrect");
          });
      } catch (error) {
        console.error('Error submitting form:', error);
        setLoginError("An error occurred while submitting the form");
      }
    } else {
        alert("Please fill in both email and password fields");
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: "black", height: "50px" }}>Login</div>
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
                            <img alt="logo" className="logo" src='https://www.shutterstock.com/shutterstock/photos/1984672004/display_1500/stock-vector-catering-quality-food-design-premium-logo-1984672004.jpg' />
                          </div>
                          <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example17">Email address</label>
                            <input type="email" id="form2Example17" className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`} name="email" value={inputData.email} onChange={handleData} />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                          </div>
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example27">Password</label>
                            <input type="password" id="form2Example27" className={`form-control form-control-lg ${errors.pass ? 'is-invalid' : ''}`} name="pass" value={inputData.pass} onChange={handleData} />
                            {errors.pass && <div className="invalid-feedback">{errors.pass}</div>}
                          </div>
                          <div className="pt-1 mb-4">
                            <button className="bg-black btn btn-dark btn-lg btn-block" type="button" onClick={handleSubmit}>Login</button><br />
                            <Link className="small text-muted" to="/forgetpassword">Forgot password?</Link>
                          </div>
                          {loginError && <div className="text-danger">{loginError}</div>}
                          <br />
                          <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>Don't have an account?
                            <Link to="/signup1" style={{ color: "#393f81", marginLeft: "10px" }}>Register Caterer</Link>
                            <Link to="/signup2" style={{ color: "#393f81", marginLeft: "33px" }}>Register Customer</Link>
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
      </div>
    </div>
  );
}
