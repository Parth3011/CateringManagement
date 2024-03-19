import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../Css/navbar.css'

export default function FirstPage() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    < img alt="logo" className="logo" src='https://www.shutterstock.com/shutterstock/photos/1984672004/display_1500/stock-vector-catering-quality-food-design-premium-logo-1984672004.jpg' />

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="log">
                                <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                            </li>
                            {/* <li className="nav-item">
                                  <Link className="nav-link" to="/">Link</Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}
