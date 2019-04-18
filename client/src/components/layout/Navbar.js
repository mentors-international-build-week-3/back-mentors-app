import React, { Component } from "react";
import { NavLink } from "react-router-dom";


class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper blue">
            <NavLink
              to="/"
              style={{
                fontFamily: "monospace",
                fontSize: "2rem",
                marginLeft: "3rem"
              }}
              className="col s5 brand-logo left white-text"
            >
              Mentors International
            </NavLink>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;