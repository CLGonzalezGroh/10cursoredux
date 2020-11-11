import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Menu from "./Menu";
import Users from "./Users";

const Task = () => <div>Tasks</div>;

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margin">
      <Route exact path="/users" component={Users}></Route>
      <Route exact path="/task" component={Task}>
        {Task}
      </Route>
    </div>
  </BrowserRouter>
);

export default App;
