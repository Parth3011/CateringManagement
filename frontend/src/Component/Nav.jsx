import React from 'react';
import { Link } from 'react-router-dom';
import "../Css/navbar.css";
// import { useEffect } from 'react';


function Nav({ user }) {
console.log(user);
//   useEffect(() => {
//     console.log('User Type:', user);
// }, []);
  return (

<div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <img
            alt="logo"
            className="logo"
            src="https://www.shutterstock.com/shutterstock/photos/1984672004/display_1500/stock-vector-catering-quality-food-design-premium-logo-1984672004.jpg"
          />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <h1>demo nav</h1>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  
{/*         
              <li className="log">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/login">
                  Login
                </Link>
            </li> */}
     
           
            

            {user=== 'customer' && (
          <li>
           <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active mx-5" aria-current="page" to="/customer">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active mx-5" to="/customer/menu">Menu</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active mx-5" to="/customer/cart">Cart</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="profile-pic">
                                        <img src="https://source.unsplash.com/250x250?boy" alt="Symbol" className='logo' />
                                    </div>
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/customer/profile"><i className="fas fa-sliders-h fa-fw"></i> Profile</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/customer/logout"><i className="fas fa-sign-out-alt fa-fw"></i> Log Out</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>  
             </li>
            )}



      {user=== 'caterer' && (
          <li>
           <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active mx-5" aria-current="page" to="/caterer">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active mx-5" to="/caterer/menu">Menu</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active mx-5" to="/caterer/order">Order</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="profile-pic">
                                        <img src="https://source.unsplash.com/250x250?boy" alt="Symbol" className='logo' />
                                    </div>
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/caterer/profile"><i className="fas fa-sliders-h fa-fw"></i> Profile</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/caterer/logout"><i className="fas fa-sign-out-alt fa-fw"></i>Log Out</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>  
             </li>
            )}



    {user=== 'admin' && (
          <li>
           <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active mx-5" aria-current="page" to="/admin">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active mx-5" to="/admin/admincaterer">caterer</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active mx-5" to="/admin/admincustomer">customer</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="profile-pic">
                                        <img src="https://source.unsplash.com/250x250?boy" alt="Symbol" className='logo' />
                                    </div>
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/admin/profile"><i className="fas fa-sliders-h fa-fw"></i> Profile</Link></li>
                                    <li><Link className="dropdown-item" to="/signupadmin"><i className="fas fa-sliders-h fa-fw"></i> Signup</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/admin/logout"><i className="fas fa-sign-out-alt fa-fw"></i> Log Out</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>  
             </li>
            )}



          </ul>
        </div>
      </div>
    </nav>
  </div>

  )
  }







export default Nav;
