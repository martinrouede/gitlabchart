import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    infoContact: {
        marginTop: 'auto',
        marginBottom: theme.spacing(2),
        verticalAlign: 'middle',
        textAlign: 'center',
        fontSize: '3em',
    },
    icon: {
        color: theme.palette.text.primary,
        '&:hover': {
            color: theme.palette.secondary.main,
        }
    }
}));

const styles = {
    useStyles
};

export default styles;