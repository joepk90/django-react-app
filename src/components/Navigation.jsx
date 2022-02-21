import React from 'react';
import { Link } from 'react-router-dom'

const Navigation = () => (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Home</Link>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            {/* <li class="nav-item active">
                <Link class="nav-link" to="/about">About</Link>
            </li> */}
        </ul>
        <Link className="btn btn-info my-2 my-sm-0" to="/login">Login</Link>
    </nav>
)

export default Navigation;