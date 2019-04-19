import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from './reducers';

import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Messages from "./components/dashboard/Messages";
import Students from "./components/dashboard/Students";
import NewSms from "./components/dashboard/NewSms";
import Rsvpbot from "./components/dashboard/Rsvpbot";



const store = createStore(rootReducer, applyMiddleware(thunk, logger));


// checks for auth token to keep the user logged in
if (localStorage.jwtToken) {

    // sets the auth token on the authorization header
	const token = localStorage.jwtToken;
    setAuthToken(token);

    // decodes the auth token and retrieves the user's information and expiration
    const decoded = jwt_decode(token);
    // sets the user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // checks for expired auth token
    const currentTime = Date.now() / 1000; // to get in milliseconds

    if (decoded.exp < currentTime) {
		// logs user out
		store.dispatch(logoutUser());

		// redirects to the login page
		window.location.href = "./login";
    }
}


class App extends Component {
  render() {
    return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Navbar />
					<Route exact path="/" component={Landing} />
					<Route 
						exact 
						path="/signup" 
						render={props => <Signup {...props} />}
					/>
					<Route 
						exact 
						path="/login" 
						render={props => <Login {...props} />}
					/>
					<Switch>
						<PrivateRoute exact path="/dashboard" component={Dashboard} />
						<PrivateRoute exact path="/students" component={Students} />
						<PrivateRoute exact path="/messages" component={Messages} />
						<PrivateRoute exact path="/newsms" component={NewSms} />
						<PrivateRoute exact path="/rsvpbot" component={Rsvpbot} />
					</Switch>
				</div>
			</Router>
		</Provider>
    );
  }
}

export default App;
