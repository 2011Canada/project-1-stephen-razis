import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LoginForm } from './components/login/LoginForm';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/home/Home';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './components/ThemeProvider';

function App() {
  const [user, changeUser] = useState();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Router>

          <Route path="/login">
            <LoginForm />
          </Route>

          <Route path="/">
            <Home currentUser={user}/>
          </Route>

        </Router>
        <Footer />
        </ThemeProvider>
    </div>
  );
}

export default App;
