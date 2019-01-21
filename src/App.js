import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/nav/Navbar";
import Front from "./components/front/Front";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Dashboard from "./components/dashboard/Dashboard";
import MakePayment from "./components/payment/MakePayment";
import EditProfile from "./components/editProfile/EditProfile";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Front} />
            <Route exact path="/signup/" component={SignUp} />
            <Route path="/signup/:id" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/makepayment" component={MakePayment} />
            <Route exact path="/editprofile" component={EditProfile} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
