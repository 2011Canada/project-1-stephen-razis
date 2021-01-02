import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { LoginForm } from './components/login/LoginForm';
import { Header } from './components/Header';
import { Home } from './components/Home/Home';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './components/ThemeProvider';

export const UserContext = React.createContext<any>(undefined)

function App() {
  const [user, changeUser] = useState();

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <ThemeProvider theme={theme}>

          <Router>
            <Header currentUser={user} updateCurrentUser={changeUser}/>

            <Route path="/login">
              <LoginForm currentUser={user} updateCurrentUser={changeUser}/>
            </Route>
            <Route path="/">
              <Home currentUser={user}/>
            </Route>

            {/* <Link to="/"> Home</Link>
            <br></br>
            <Link to="/login"> Login</Link> */}
          </Router>

        </ThemeProvider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
