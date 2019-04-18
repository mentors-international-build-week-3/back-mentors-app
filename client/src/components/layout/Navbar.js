import React, { Component } from "react";
import { Link } from "react-router-dom";


class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper blue">
            <Link
              to="/"
              style={{
                fontFamily: "monospace",
                fontSize: "3rem"
              }}
              className="col s5 brand-logo center white-text"
            >
              Mentors International
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;