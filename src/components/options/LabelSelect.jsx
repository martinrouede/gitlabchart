import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

import Styles from './Styles';

const LabelSelect = (props) => {

    const classes = Styles.useStyles();

    return (
            <FormControl className={classes.formControl}>
                <InputLabel color='secondary' id="todo-label-input">{props.nameLabel}</InputLabel>
                <Select
                    id="todo-label-select"
                    color='secondary'
                    value={props.valueLabel}
                    onChange={event => props.handleChangeLabel(event.target.value)}
                    input={<Input id="select-label-todo-chip" />}
                >
                    <MenuItem value={''}>-</MenuItem>
                    {props.labels.map((aLabel) => (
                        <MenuItem key={aLabel.id} value={aLabel}>
                            <Chip key={aLabel.id} label={aLabel.name} style={{ backgroundColor: aLabel.color, color: 'white' }} className={classes.chip} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
    );
}
export default LabelSelect;
