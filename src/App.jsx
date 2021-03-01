import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Styles from './Styles';
import Home from './components/home/Home';
import Contact from './components/contact/Contact';
import DrawerBar from './components/drawerBar/DrawerBar';
import Login from './components/login/Login';
import ConfigAxios from './midlewares/axios';
import ThemeService from './services/theme.service';
import AuthService from './services/auth.service';

const App = () => {
  const classes = Styles.useStyles();

  const [themeMode, setThemeMode] = useState(ThemeService.getTheme() ? ThemeService.getTheme().darkMode : false);
  const [user, setUser] = useState({});

  const isLoggedIn = AuthService.isAuthenticated()

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: themeMode ? 'dark' : 'light',
          secondary: {
            main: '#e14538',
          }
        },
      }),
    [themeMode],
  );

  return (
    <div className={classes.App}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <DrawerBar themeMode={themeMode} setThemeMode={setThemeMode} user={user} setUser={setUser} isLoggedIn={isLoggedIn} />

          <ConfigAxios />

          <Switch>
            <Route exact path="/">
              {isLoggedIn ? <Home setUser={setUser} /> : <Login />}
            </Route>
          </Switch>

          <Contact />

        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
