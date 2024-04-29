import React from 'react';
import { Link } from 'react-router-dom';

export default function NavCaterer() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ position: "relative", width: "100%" }}>
                <div className="container-fluid">
                    <img
                        alt="logo"
                        className="logo"
                        src='https://www.shutterstock.com/shutterstock/photos/1984672004/display_1500/stock-vector-catering-quality-food-design-premium-logo-1984672004.jpg'
                        style={{ width: "40px", float: "left", borderRadius: "50%", marginTop: "1px", marginLeft: "20px" }}
                    />
                    <button className="navbar-toggler" type="button" style={{ float: "right", marginRight: "10px" }}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ marginLeft: "auto" }}>
                            {/* <li className="nav-item">
                                <Link className="nav-link active mx-3" aria-current="page" to="/caterer" style={{ color: "white" }}>Outlet</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link active mx-3" to="/caterer/home" style={{ color: "white" }}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active mx-3" to="/caterer/menu" style={{ color: "white" }}>Menu</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active mx-3" to="/caterer/order" style={{ color: "white" }}>Order</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav" style={{ marginRight: "20px" }}>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="profile-pic">
                                        <img src="https://source.unsplash.com/250x250?boy" alt="Symbol" className='logo' style={{ width: "40px", borderRadius: "50%" }} />
                                    </div>
                                    {/* Profile */}
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/caterer/profile"><i className="fas fa-sliders-h fa-fw"></i> Profile</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/caterer/logout"><i className="fas fa-sign-out-alt fa-fw"></i> Log Out</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
