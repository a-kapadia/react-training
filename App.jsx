import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Display from './Display';
import AddItem from './AddItem';
import Home from './Home';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/add" component={AddItem} />
    <Route exact path="/view" component={Display} />
  </Switch>
);

export default App;

