import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom'; // Add this line
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
        {loggedIn ? <Dashboard /> : <Redirect to="/login" />} {/* Update the import */}
      </Route>
      <Route exact path="/login">
        {loggedIn ? <Dashboard /> : <Login setLoggedIn={setLoggedIn} />}
      </Route>
      <Route exact path="/register">
        {loggedIn ? <Dashboard /> : <Register />}
      </Route>
      <Route exact path="/dashboard">
        {loggedIn ? <Dashboard /> : <Redirect to="/login" />} {/* Update the import */}
      </Route>
    </Router>
  );
};

export default App;