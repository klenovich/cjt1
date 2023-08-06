import React, { useState, useEffect } from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import axios from 'axios';

import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import Profile from './components/profile'; // Add this line

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
    <Routes>
      <Route exact path="/">
        {loggedIn ? <Dashboard /> : <redirect to="/login" />}
      </Route>
      <Route exact path="/login">
        {loggedIn ? <Dashboard /> : <Login setLoggedIn={setLoggedIn} />}
      </Route>
      <Route exact path="/register">
        {loggedIn ? <Dashboard /> : <Register />}
      </Route>
      <Route exact path="/dashboard">
        {loggedIn ? <Dashboard /> : redirect="/login"}
      </Route>
      <Route exact path="/profile">
        {loggedIn ? <Profile /> : redirect="/login"}
      </Route>
    </Routes>
  );
};

export default App;