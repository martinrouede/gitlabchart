import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = (props) => {

    return (
        <Dialog
            open={props.alert.open}
            onClose={() => props.setAlert(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Ha ocurrido un error"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.alert.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setAlert(false)} color="primary" autoFocus>
                    OK
  </Button>
            </DialogActions>
        </Dialog>
    );
}
export default AlertDialog;