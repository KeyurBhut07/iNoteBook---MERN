import React from "react";
//import { useLocation } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  let history = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    history("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            iNoteBook
          </NavLink>
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
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li> */}
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <NavLink
                  to="/login"
                  className="btn btn-light mx-1"
                  role="button"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="btn btn-light mx-1"
                  role="button"
                >
                  SignUP
                </NavLink>
              </form>
            ) : (
              <button onClick={handleLogout} className="btn btn-light">
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
