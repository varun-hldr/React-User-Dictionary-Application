import React from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          <Link to="/">Users Dictionary App</Link>
        </span>
        <form className="d-flex">
          <button className="addUserBtn">
            <Link to="/adduser">ADD USER</Link>
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
