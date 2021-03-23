import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';

import Styles from './Styles';

const GroupSelect = (props) => {

    const classes = Styles.useStyles();

    const renderSelectGroup = group => {
        const children = group.children.map(aChild => {
            return (
                <MenuItem key={aChild.id} value={aChild.id}>{aChild.full_name}</MenuItem>
            );
        });
        return [<ListSubheader style={{ pointerEvents: 'none' }} >{group.full_name}</ListSubheader>, children];
    }

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
                    {props.groups.map(aGroup => renderSelectGroup(aGroup))}
                </Select>
            </FormControl>
    );
}
export default GroupSelect;
