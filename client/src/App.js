import React from 'react';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
const token = localStorage.IDToken;
if (token) {
  const decodeToken = jwtDecode(token);
  if (decodeToken.exp * 1000 < Date.now()) {
    window.location.assign('/login');
  }
  axios.defaults.headers.common['authorization'] = localStorage.IDToken;
}
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#121212',
    },
    secondary: {
      main: '#f44336',
      contrastText: '#000',
    },
  },
});
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Navbar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/chat/:id" component={Chat} />
      </Switch>
    </MuiThemeProvider>
  );
}

export default App;
