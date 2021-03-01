import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

function ConfigAxios(props) {
    const classes = useStyles();
    const [openProgress, setOpenProgress] = useState(false);

    useEffect(() => {
        axios.interceptors.request.use(config => {
            setOpenProgress(true);
            return config;
        }, error => Promise.reject(error));

        axios.interceptors.response.use(response => {
            setOpenProgress(false);
            return response;
        },
            error => {
                setOpenProgress(false);
                return Promise.reject(error);
            }
        );
    }, []);
    return (
        <Backdrop className={classes.backdrop} open={openProgress} >
            <CircularProgress color='inherit' />
        </Backdrop>
    );
}

export default withRouter(ConfigAxios);
