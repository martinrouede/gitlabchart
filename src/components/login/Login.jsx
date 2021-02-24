import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import AuthService from '../../services/auth.service';
import GitLabLogo from '../../logo/GitLabLogo';
import Styles from './Styles';

const Login = (props) => {
    const classes = Styles.useStyles();

    const [privateToken, setPrivateToken] = useState(null);
    const [serverUrl, setServerUrl] = useState(null);

    const [showToken, setShowToken] = useState(false);    // muestra el contenido del campo private token
    const [showUrl, setShowUrl] = useState(true);    // muestra el contenido del campo server url

    const handleShowToken = () => {
        setShowToken(!showToken);
    }

    const handleShowUrl = () => {
        setShowUrl(!showUrl);
    }

    const saveConfig = () => {
        AuthService.login(serverUrl, privateToken);
        window.location.reload();
    }

    return (
        <div className={classes.root}>
            <Tooltip placement='bottom-end' title='This logo was created 100% in CSS. See more details in src/logo/GitLabLogo.css'>
                <div className={classes.gitlabLogo}><GitLabLogo /></div>
            </Tooltip>

            <div className={classes.form}>
                <FormControl className={classes.formControl}>
                    <InputLabel color='secondary' required={true} id='input-label-server-url'>
                        Server URL
                    </InputLabel>
                    <Input
                        id='input-server-url'
                        color='secondary'
                        placeholder='e.g. https://domain.com/'
                        required={true}
                        type={showUrl ? 'text' : 'password'}
                        value={serverUrl || ''}
                        onChange={e => setServerUrl(e.target.value)}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={() => handleShowUrl()}
                                >
                                    {showUrl ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel color='secondary' required={true} id='input-label-private-token'>
                        Private Token
                    </InputLabel>
                    <Input
                        id='input-private-token'
                        color='secondary'
                        required={true}
                        type={showToken ? 'text' : 'password'}
                        value={privateToken || ''}
                        onChange={e => setPrivateToken(e.target.value)}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={() => handleShowToken()}
                                >
                                    {showToken ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <Button disabled={privateToken && serverUrl ? false : true} className={classes.buttonLogin}>
                    <FontAwesomeIcon icon={faSignInAlt} onClick={saveConfig} />
                </Button>

                <div className={classes.getToken}>
                    <Link color='secondary' href='https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html'>
                        How I get my 'Private Token'?
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default Login;