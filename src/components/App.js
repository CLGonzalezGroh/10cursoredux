import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Menu from "./Menu";
import Publications from "./Publications";
import Users from "./Users";

const Tasks = () => <div>Tasks</div>;

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margin">
      <Switch>
        <Route exact path="/" component={Users}></Route>
        <Route exact path="/tasks" component={Tasks}></Route>
        <Route exact path="/publications/:key" component={Publications}></Route>
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
