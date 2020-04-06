import React from "react";
import { Link, NavLink } from "react-router-dom";

// items: array
const NavBar = ({ header, items }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Link className="navbar-brand" to={header.path}>
        {header.label}
      </Link>
      <div className="collapse navbar-collapse" id="vidlyNav">
        <ul className="navbar-nav">
          {items.map(item => {
            return (
              <NavLink
                key={item.path}
                className="nav-item nav-link m-2"
                to={item.path}>
                {item.label}
              </NavLink>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
