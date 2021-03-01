import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        direction: 'column',
        alignItems: 'center',
        justify: 'center',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    options: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        borderRadius: '100%',
        width: '3%',
        height: '3%'
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));

const styles = {
    useStyles
};

export default styles;