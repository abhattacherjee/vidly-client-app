import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

// items: array
class Navbar extends Component {
  state = {};

  renderNavLink = (item, user) => {
    return (
      <NavLink key={item.path} className="nav-item nav-link m-2" to={item.path}>
        {item.content ? item.content(user.name) : item.label}
      </NavLink>
    );
  };
  render() {
    const { header, items, user } = this.props;
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <Link className="navbar-brand" to={header.path}>
          {header.label}
        </Link>
        <div className="collapse navbar-collapse" id="vidlyNav">
          <ul className="navbar-nav">
            {items.map(item => {
              if (!user && item.show === "unauthenticated")
                return this.renderNavLink(item, user);
              if (user && item.show === "authenticated")
                return this.renderNavLink(item, user);
              if (item.show === "always") return this.renderNavLink(item, user);
              return null;
            })}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
