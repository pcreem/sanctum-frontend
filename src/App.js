import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import Books from './Books';
import Login from './Login';
import api from './services/api';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        sessionStorage.getItem('isLoggedIn') === 'true' || false
      );
    const handleLogin = () => {
        setIsLoggedIn(true);
        sessionStorage.setItem('isLoggedIn', true);
    };
    const handleLogout = (e) => {
    e.preventDefault();
    const cb = async () => {
        const response = await api.post('/logout');
        if (response.status === 204) {
        setIsLoggedIn(false);
        sessionStorage.setItem('isLoggedIn', false);
        }
    };
    cb();
    };

  const authLink = isLoggedIn ? (
    <a href="" onClick={handleLogout}>Logout</a> 
  ) : (
    <NavLink to="/login">Login</NavLink>
  );
  return (
    <Router>
      <nav>
        <NavLink to="/">Home</NavLink>
        {' '}
        {authLink}
        {' '}
        <NavLink to="/books">Books</NavLink>
      </nav>
      <Switch>
        <Route
          path='/login'
          render={(props) => (
            <Login {...props} onLogin={handleLogin} />
          )}
        />
        <Route
          path='/books'
          render={(props) => (
            <Books {...props} isLoggedIn={isLoggedIn} />
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;