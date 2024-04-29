import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin/home">
            <img
              alt="logo"
              className="logo"
              src="https://www.shutterstock.com/shutterstock/photos/1984672004/display_1500/stock-vector-catering-quality-food-design-premium-logo-1984672004.jpg"
              style={{ width: "40px", borderRadius: "50%", marginRight: "10px" }}
            />
            {/* Brand */}
          </Link>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/admin"
                  style={{ color: "white" }}
                >
                  Outlet
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/admin/home" style={{ color: "white",marginLeft:"50px" }}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/admincaterer" style={{ color: "white",marginLeft:"50px" }}>
                  Caterer
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin/admincustomer"
                  style={{ color: "white" , marginLeft:"50px" }}
                >
                  Customer
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://source.unsplash.com/250x250?boy"
                    alt="Symbol"
                    className="logo"
                    style={{ width: "40px", borderRadius: "50%" }}
                  />
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/admin/profile">
                      <i className="fas fa-sliders-h fa-fw"></i> Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/signupadmin">
                      <i className="fas fa-sliders-h fa-fw"></i> Signup
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/logout">
                      <i className="fas fa-sign-out-alt fa-fw"></i> Log Out
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
