import React, { useState } from 'react';
import clsx from 'clsx';

import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwitchLabel from '@material-ui/core/Switch';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

import Styles from './Styles';
import GitLabChartLogo from '../../logo/GitLabChart-icon.png';
import AuthService from '../../services/auth.service';
import ThemeService from '../../services/theme.service';

const DrawerBar = (props) => {

    const classes = Styles.useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleChange = () => {
        ThemeService.setTheme(!props.themeMode);
        props.setThemeMode(ThemeService.getTheme().darkMode);
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position='fixed'
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar style={{ backgroundColor: theme.palette.secondary.main }}>
                    <Typography variant='h6' noWrap className={classes.title}>
                        GitLab Chart
          </Typography>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='end'
                        onClick={handleDrawerOpen}
                        className={clsx(open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
            </main>
            <Drawer
                className={classes.drawer}
                variant='persistent'
                anchor='right'
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>

                    <img src={GitLabChartLogo} className={classes.gitLabChartLogo} alt='GitLab Chart Logo'/>
                </div>
                <Divider />
                {props.isLoggedIn ?
                    <Link href={props.user.web_url}>
                        <img
                            className={classes.avatar}
                            src={props.user.avatar_url}
                            alt='user avatar'
                        />
                    </Link>
                    : <AccountCircle className={classes.avatarLess} />
                }
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <span>
                                <FontAwesomeIcon icon={faSun} style={{ fontSize: '1.5em' }} />
                                <SwitchLabel checked={props.themeMode} onChange={handleChange} />
                                <FontAwesomeIcon icon={faMoon} style={{ fontSize: '1.5em' }} />
                            </span>
                        </ListItemIcon>
                        <ListItemText style={{ textAlign: 'right' }} primary='Switch Mode' />
                    </ListItem>
                    {props.isLoggedIn ?
                        <ListItem button>
                            <ListItemIcon className={classes.buttonLogout} onClick={() => AuthService.logout()}>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </ListItemIcon>
                            <ListItemText style={{ textAlign: 'right' }} primary='Sign Out' />
                        </ListItem>
                        : <div />
                    }
                </List>
            </Drawer>
        </div >
    );
}

export default DrawerBar;
