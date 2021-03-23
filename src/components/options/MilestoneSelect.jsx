import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Styles from './Styles';

const MilestoneSelect = (props) => {

    const classes = Styles.useStyles();

    return (
            <FormControl className={classes.formControl}>
                <InputLabel color='secondary' id='project-input'>{props.nameLabel}</InputLabel>
                <Select
                    id='project-select'
                    color='secondary'
                    value={props.value}
                    onChange={event => props.handleChange(event.target.value)}
                >
                    <MenuItem value={''}>-</MenuItem>
                    {props.options.map((aMilestone) => (
                        <MenuItem key={aMilestone.id} value={aMilestone.title}>{aMilestone.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
    );
}
export default MilestoneSelect;
