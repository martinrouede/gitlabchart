import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        textAlign: 'center',
        display: 'grid',
    },
    gitlabLogo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        display: 'grid',
        marginTop: theme.spacing(4),
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    buttonLogin: {
        fontSize: '2em',
        '&:hover': {
            color: '#0bbc0b',
        },
    },
    getToken: {
        textAlign: 'center',
        fontSize: '1.5em',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        color: 'secondary'
    }
}));

const styles = {
    useStyles
};

export default styles;