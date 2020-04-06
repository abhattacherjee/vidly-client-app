import React from "react";
import { NavLink } from "react-router-dom";

// items: array
const NavBar = ({ header, items }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <NavLink className="navbar-brand" to={header.path}>
        {header.label}
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="vidlyNav">
        <ul className="navbar-nav">
          {items.map(item => {
            return (
              <li className="nav-item">
                <NavLink to={item.path}>{item.label} </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
