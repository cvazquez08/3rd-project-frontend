import React, { Component } from "react";
import "./App.css";

import axios from "axios";

import { Switch, NavLink, Route } from "react-router-dom";

import Signup from "./components/user-pages/Signup";
import Login from "./components/user-pages/Login";
import Home from "./components/Home";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/checkuser", { withCredentials: true })
      .then(responseFromBackend => {
        const { userDoc } = responseFromBackend.data;

        //  console.log("Check user in APP.JS: ",responseFromBackend.data)
        this.syncCurrentUser(userDoc);
      })
      .catch();
  }

  syncCurrentUser(user) {
    this.setState({ currentUser: user });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Iron Phones </h1>
          <nav>
            <NavLink to="/"> Home </NavLink>


            <NavLink to="/signup-page"> Signup </NavLink>
            <NavLink to="/login-page"> Login </NavLink>
          </nav>

          <Switch>
            {/* example of how to pass a component without props to Router */}
            {/* <Route path="/somepage" component={ someComponentThatWillRender} /> */}
            <Route exact path="/" component= { Home } />      


            <Route
              path="/signup-page"
              render={ () => 
                <Signup
                  currentUser={this.state.currentUser}
                  onUserChange={ userDoc => this.syncCurrentUser(userDoc)}
                />
              }
            />

            <Route
              path="/login-page"
              render={() => 
                <Login
                  currentUser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              }
            />
          </Switch>


        </header>
      </div>
    );
  }
}

export default App;
