import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Main } from './Main';
import { NotFound } from './NotFound';
import { Footer } from './Footer';
import { Home } from '../containers/Home';
import { Login } from '../containers/Login';
import { Header } from '../containers/Header';
import { EditTask } from '../containers/EditTask';

import '../styles/style.scss';

export const App = () => {
  return (
    <Router>
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/edit/:id">
            <EditTask />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Main>
      <Footer />
    </Router>
  );
};
