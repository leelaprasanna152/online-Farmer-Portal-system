import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../../Context/Auth/auth-context';
import './NavLinks.css';


const NavLinks = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <NavLink className="nav-route" to="/" exact>Home</NavLink>
           

            {auth.isLoggedIn ? (
                <div className="dropdown-nav-button">
                    <NavDropdown id="dropdown-basic-button" title="Account">
                        <NavLink className="dropdown-item" to="/profile">Profile</NavLink>
                        <NavLink className="dropdown-item" to="/orders">Orders</NavLink>
                        <NavLink className="dropdown-item" to="/favorites">Favorites</NavLink>
                        <NavLink className="dropdown-item" to="/about">About</NavLink>
                        <NavDropdown.Divider />
                        <NavLink className="dropdown-item" to="/logout">Logout</NavLink>
                    </NavDropdown>
                </div>
            ) : (
                <div className="auth-buttons">
                    <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
                    <button className="register-btn" onClick={() => navigate('/register')}>Register</button>
                </div>
            )}

            {auth.isLoggedIn && <button className="login-btn" onClick={auth.logout}>Logout</button>}
        </React.Fragment>
    );
};

export default NavLinks;

