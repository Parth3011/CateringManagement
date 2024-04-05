// import axios from 'axios';
// import React, { useState } from 'react'

// const ForgetPassword = () => {
//   const [ inputdata, setinputData] = useState("");
  


//   const handledata = (e) => {
//     setinputData({ ...inputdata, [e.target.name]: e.target.value });
//   }


//     const onmail = (e) => {
//         e.preventDefault();
//         console.log("outside try");
//         try {
//             console.log("in onmail");
//              axios.post('http://localhost:7000/api/forgetpassword', inputdata)
//             .then((resp) => console.log(resp))//alert("successfully changed"))
//             .then((err) => console.log(err))
//         } catch (e) {
//           console.error('Error submitting form:', e);
//           alert('An error occurred while submitting the form');
//         }
//       };
    
//   return (
//     <div>
//        <input type="email" name="email" value={inputdata.email} onChange={handledata} placeholder="Enter email"/> 
//        <button onClick={onmail} type='submit'>Send mail</button>
//     </div>
//   )
// }

// export default ForgetPassword


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:7000/api/forgetpassword', { email });
      setMessage(response.data.msg); // Update state with the message from the backend
      alert(response.data.msg); // Show message in alert box
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage("An error occurred while submitting the form");
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: "black", height: "50px" }}>Forgot Password</div>
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
                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Forgot Password</h5>
                          </div>
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example17">Email address</label>
                            <input type="email" id="form2Example17" className="form-control form-control-lg" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                          </div>
                          <div className="pt-1 mb-4">
                            <button className="bg-black btn btn-dark btn-lg btn-block" type="button" onClick={handleForgotPassword}>Submit</button><br />
                            <Link className="small text-muted" to="/login">Back to Login</Link>
                          </div>
                          <br />
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
