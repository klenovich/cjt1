import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Login from './components/login';
import Register from './components/::gister';
import Dashboard from './components/Dashboard';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get('/api/checkLoggedIn');
        if (response.data.loggedIn) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          {loggedIn ? <Redirect to="/dashboard" /> : <Login setLoggedIn={setLoggedIn} />}
        </Route>
        <Route exact path="/register">
          {loggedIn ? <Redirect to="/dashboard" /> : <Register />}
        </Route>
        <Route exact path="/dashboard">
          {loggedIn ? <Dashboard /> : <Redirect to="/login" />}
        </Route>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;