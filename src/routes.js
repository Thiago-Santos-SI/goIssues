import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Repository from './pages/repository';
import HomePage from "./pages/main/main";

export default () => (
  <Router>
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/repository/:repository" component={Repository} />
    </Switch>
  </Router>
);
