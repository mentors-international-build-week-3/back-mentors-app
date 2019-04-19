import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";


class Dashboard extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        // const { user } = this.props.auth;
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h3>
                            <b>Hello there!</b>
                        </h3>
                        <h4>
                            <b>Welcome to your Mentor Dashboard!</b>
                            <p className="flow-text grey-text text-darken-1">
                                Let's change some lives, one 
                                <i className="material-icons blue-text outlined" style={{ fontSize: "3rem", verticalAlign: "top", padding: "0 0.5rem" }}>textsms</i> at a time! 
                            </p>
                        </h4>
                        <Link 
                            to="/messages"
                            href="/messages"
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                margin: "1rem"
                            }}
                            onClick={this.onMessagesClick}
                            className="btn btn-large waves-effect waves-light hoverable green accent-5"
                        >
                            Messages
                        </Link>
                        <Link 
                            to="/students" 
                            href="/students"
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                margin: "1rem"
                            }}
                            className="btn btn-large waves-effect waves-light hoverable purple accent-5"
                        >
                            Students
                        </Link>
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                margin: "1rem"
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-large waves-effect waves-light hoverable red accent-3"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);