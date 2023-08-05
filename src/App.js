import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get('/api/checkLoggedIn');
        if (response.data.loggedIn) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
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
      <Route exact path="/">
        {loggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/login">
        {loggedIn ? <Redirect to="/dashboard" /> : <Login setLoggedIn={setLoggedIn} />}
      </Route>
      <Route exact path="/register">
        {loggedIn ? <Redirect to="/dashboard" /> : <Register />}
      </Route>
      <Route exact path="/dashboard">
        {loggedIn ? <Dashboard /> : <Redirect to="/login" />}
      </Route>
    </Router>
  );
};

export default App;