import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Styles from './Styles';
import Home from './components/home/Home';
import Contact from './components/contact/Contact';
import DrawerBar from "./components/drawerBar/DrawerBar";
import Login from './components/login/Login';
import PrivateRoute from './components/PrivateRoute';
import ConfigAxios from './midlewares/axios';
import ThemeService from './services/theme.service';

const App = (props) => {
  const classes = Styles.useStyles();

  const [themeMode, setThemeMode] = useState(ThemeService.getTheme() ? ThemeService.getTheme().darkMode : false);

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
          <DrawerBar themeMode={themeMode} setThemeMode={setThemeMode}/>

          <ConfigAxios />

          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path={["/", "/home"]} component={Home} />
          </Switch>

         <Contact />

        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
