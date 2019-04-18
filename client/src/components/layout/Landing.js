import React, { Component } from "react";


class Landing extends Component {
  render() {
    return (
        
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4 style={{ fontSize: "5rem", verticalAlign: "middle", marginTop: "6rem"}}>
                <i className="material-icons blue-text text-darken-4" style={{ fontSize: "5rem", verticalAlign: "top", paddingRight: "1.5rem" }}>school</i> + 
                <i className="material-icons orange-text text-darken-1" style={{ fontSize: "5rem", verticalAlign: "top", paddingLeft: "2rem", paddingRight: "1.5rem" }}>people</i>
                <span style={{ paddingLeft: "0", paddingRight: "1.5rem" }}> = </span>
                <i className="material-icons brown-text text-darken-3" style={{ fontSize: "5rem", verticalAlign: "top", paddingLeft: "1rem", paddingRight: "1.5rem" }}>work</i> +
                <i className="material-icons green-text text-darken-1" style={{ fontSize: "5rem", verticalAlign: "top", padding: "0 1.5rem" }}>monetization_on</i>
            </h4>
            <p className="flow-text" style={{ fontSize: "2.5rem", verticalAlign: "top", marginTop: "5rem"}}>
                Help us <i className="material-icons red-text" style={{ fontSize: "5rem", verticalAlign: "middle" }}>cancel</i> poverty across the 
                <i className="material-icons blue-text" style={{ fontSize: "5rem", verticalAlign: "middle" }}>public</i>,
            </p>
            <p className="flow-text" style={{ fontSize: "2.5rem" }}>
                <i className="material-icons purple-text text-lighten-1" style={{ fontSize: "6rem", verticalAlign: "middle" }}>repeat_one</i> 
                entrepreneur at a <i className="material-icons pink-text text-lighten-1" style={{ fontSize: "5rem", verticalAlign: "middle" }}>access_time</i>.
            </p>
            <br />
            <a
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Sign Up
            </a>
            <a
              style={{
                marginLeft: "2rem",
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect white hoverable black-text"
            >
              Log In
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;