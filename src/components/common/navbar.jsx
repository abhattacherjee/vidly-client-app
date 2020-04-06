import React from "react";
import { NavLink } from "react-router-dom";

// items: array
const NavBar = ({ header, items }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <NavLink className="navbar-brand" to={header.path}>
        {header.label}
      </NavLink>
      <div className="collapse navbar-collapse" id="vidlyNav">
        <ul className="navbar-nav">
          {items.map(item => {
            return (
              <li className="nav-item m-2">
                <NavLink to={item.path}> {item.label} </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
