import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Chip from '@material-ui/core/Chip';

import Styles from './Styles';

const Options = (props) => {

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
        <div className={classes.root}>
            <div className={classes.options}>

                <FormControl className={classes.formControl}>
                    <InputLabel color='secondary' id='group-input'>Group</InputLabel>
                    <Select
                        id='group-select'
                        color='secondary'
                        value={props.options.group}
                        onChange={event => props.options.handleChangeGroup(event.target.value)}
                    >
                        <MenuItem value={''}>-</MenuItem>
                        {props.options.groups.map(aGroup => renderSelectGroup(aGroup))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel color='secondary' id='project-input'>Project</InputLabel>
                    <Select
                        id='project-select'
                        color='secondary'
                        value={props.options.project}
                        onChange={event => props.options.handleChangeProject(event.target.value)}
                    >
                        <MenuItem value={''}>-</MenuItem>
                        {props.options.projects.map((aProject) => (
                            <MenuItem key={aProject.id} value={aProject.id}>{aProject.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel color='secondary' id="todo-label-input">To Do Label</InputLabel>
                    <Select
                        id="todo-label-select"
                        color='secondary'
                        value={props.options.toDoLabel}
                        onChange={event => props.options.handleChangeToDoLabel(event.target.value)}
                        input={<Input id="select-label-todo-chip" />}
                    >
                        <MenuItem value={''}>-</MenuItem>
                        {props.options.labels.map((aLabel) => (
                            <MenuItem key={aLabel.id} value={aLabel}>
                                <Chip key={aLabel.id} label={aLabel.name} style={{ backgroundColor: aLabel.color }} className={classes.chip} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel color='secondary' id="doing-label-input">Doing Label</InputLabel>
                    <Select
                        id="doing-label-select"
                        color='secondary'
                        value={props.options.doingLabel}
                        onChange={event => props.options.handleChangeDoingLabel(event.target.value)}
                        input={<Input id="select-label-doing-chip" />}
                    >
                        <MenuItem value={''}>-</MenuItem>
                        {props.options.labels.map((aLabel) => (
                            <MenuItem key={aLabel.id} value={aLabel}>
                                <Chip key={aLabel.id} label={aLabel.name} style={{ backgroundColor: aLabel.color }} className={classes.chip} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel color='secondary' id="done-label-input">Done Label</InputLabel>
                    <Select
                        id="done-label-select"
                        color='secondary'
                        value={props.options.doneLabel}
                        onChange={event => props.options.handleChangeDoneLabel(event.target.value)}
                        input={<Input id="select-label-done-chip" />}
                    >
                        <MenuItem value={''}>-</MenuItem>
                        {props.options.labels.map((aLabel) => (
                            <MenuItem key={aLabel.id} value={aLabel}>
                                <Chip key={aLabel.id} label={aLabel.name} style={{ backgroundColor: aLabel.color }} className={classes.chip} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel color='secondary' id='milestone-input'>Milestone</InputLabel>
                    <Select
                        id='milestone-select'
                        color='secondary'
                        value={props.options.milestone}
                        onChange={event => props.options.handleChangeMilestone(event.target.value)}
                    >
                        <MenuItem value={''}>-</MenuItem>
                        {props.options.milestones.map((aMilestone) => (
                            <MenuItem key={aMilestone.id} value={aMilestone.title}>{aMilestone.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </div >
            <div className={classes.buttons}>
                <FormControl className={classes.formControl}>
                    <Button color='secondary' onClick={() => props.options.handleUseLastSettings()}>Use last config</Button>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <Button variant='contained' color='secondary' onClick={() => props.options.handleSetDataChart()}
                        disabled={!props.options.milestone || !props.options.toDoLabel || !props.options.doingLabel || !props.options.doneLabel || !props.options.project || !props.options.group}>
                        Generate Charts
                    </Button>
                </FormControl>
            </div>
        </div>
    );
}
export default Options;
