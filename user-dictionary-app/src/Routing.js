import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Layout from "./components";

const Routing = () => {
  return (
    <div className="container">
      <Router>
        <Layout.Navbar />
        <Switch>
          <Route exact path="/" component={Layout.Home} />
          <Route path="/book/:id" component={Layout.Usersbook} />
          <Route path="/adduser" component={Layout.AddUser} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routing;
