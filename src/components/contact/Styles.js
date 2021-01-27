import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    
    infoContact: {
        marginTop: 'auto',
        marginBottom: theme.spacing(2),
        textAlign: 'center',
        fontSize: '3em',
        verticalAlign: 'text-bottom',
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