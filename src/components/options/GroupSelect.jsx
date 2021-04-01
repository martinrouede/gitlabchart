import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';

import Styles from './Styles';

const GroupSelect = (props) => {

    const classes = Styles.useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel color='secondary' id='group-input'>{props.nameLabel}</InputLabel>
            <Select
                id='group-select'
                color='secondary'
                value={props.value}
                onChange={event => props.handleChange(event.target.value)}
            >
                <MenuItem value={''}>-</MenuItem>

                {props.groups.map(aGroup =>
                    <MenuItem key={aGroup.id} value={aGroup.id}>{aGroup.full_name}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}
export default GroupSelect;
