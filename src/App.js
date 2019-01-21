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
import Page404 from "./components/front/Page404";

import AdminContainer from "./components/admin/AdminContainer";

class App extends Component {
  render() {
    const DefaultContainer = () => (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Front} />
          <Route exact path="/signup/" component={SignUp} />
          <Route path="/signup/:id" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/makepayment" component={MakePayment} />
          <Route exact path="/editprofile" component={EditProfile} />
          <Route path="" component={Page404} />
        </Switch>
      </React.Fragment>
    );

    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/admin/login"
              render={props => <AdminContainer type="login" />}
            />
            <Route
              exact
              path="/admin/dashboard"
              render={props => <AdminContainer type="dashboard" />}
            />
            <Route component={DefaultContainer} type="login" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  } //implment hoc
}

export default App;
