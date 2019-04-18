import React, { Component } from 'react';
import { Route } from 'react-router-dom';


import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";


class App extends Component {
  render() {
    return (
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
      </div>
    );
  }
}

export default App;
