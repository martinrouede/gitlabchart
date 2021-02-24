import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

import { useTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListSubheader from '@material-ui/core/ListSubheader';
import Chip from '@material-ui/core/Chip';
import Alert from '@material-ui/lab/Alert';

import RequestGitLab from '../../services/request.gitlab.service';
import AuthService from '../../services/auth.service';
import SettingsService from '../../services/settings.service';
import ColumnChartUtility from '../../utilities/chart.column.utility';
import LineChartUtility from '../../utilities/chart.line.utility';
import AreaChartUtility from '../../utilities/chart.area.utility';
import SortUtility from '../../utilities/sort.utility';
import Styles from './Home';

const Home = (props) => {
    const classes = Styles.useStyles();
    const theme = useTheme();

    const [openProgress, setOpenProgress] = useState(false);
    const [viewCharts, setViewCharts] = useState(false);
    const [alert, setAlert] = useState({ severity: '', message: '' }); // error - warning - info - success

    const [milestones, setMilestones] = useState([]);
    const [milestone, setMilestone] = useState('');

    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState('');

    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState('');

    const [labels, setLabels] = useState([]);
    const [toDoLabel, setToDoLabel] = useState('');
    const [doingLabel, setDoingLabel] = useState('');
    const [doneLabel, setDoneLabel] = useState('');

    const [issues, setIssues] = useState([]);

    const [dataColumnChart, setDataColumnChart] = useState([]);
    const [dataLineChart, setDataLineChart] = useState([]);
    const [dataAreaChart, setDataAreaChart] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                let someGroups = await RequestGitLab.fetchGroups(AuthService.getCurrentUser());
                someGroups = await SortUtility.sortGroups(someGroups);
                setGroups(someGroups);
            } catch (error) {
                setAlert({ severity: 'error', message: error.message });
            }
        }
        fetchData();
    }, []);

    const handleChangeGroup = (value) => {
        if (value) {
            setGroup(value);
            async function fetchData() {
                try {
                    let response = await RequestGitLab.fetchProjects(AuthService.getCurrentUser(), value);
                    setProjects(response);
                } catch (error) {
                    setAlert({ severity: 'error', message: error.message });
                }
            }
            fetchData();
        }
        else {
            setGroup('');
        }
        setProjects([]);
        setProject('');
        setMilestones([]);
        setMilestone('');
        setIssues([]);
        setLabels([]);
        setToDoLabel('');
        setDoingLabel('');
        setDoneLabel('');
        setViewCharts(false);
    };

    const handleChangeProject = (value) => {
        if (value) {
            setProject(value);
            async function fetchData() {
                try {
                    let someMilestones = await RequestGitLab.fetchMilestones(AuthService.getCurrentUser(), value);
                    setMilestones(someMilestones);
                    var amountLabels = 0;
                    var page = 1;
                    var labelsAux = [];
                    while (amountLabels === 20 || amountLabels === 0) {
                        let someLabels = await RequestGitLab.fetchLabels(AuthService.getCurrentUser(), value, page);
                        labelsAux = labelsAux.concat(someLabels);
                        amountLabels = someLabels.length;
                        page++;
                    }
                    setLabels(labelsAux);

                } catch (error) {
                    setAlert({ severity: 'error', message: error.message });
                }
            }
            fetchData();
        }
        else {
            setProject('');
        }
        setMilestones([]);
        setMilestone('');
        setIssues([]);
        setLabels([]);
        setToDoLabel('');
        setDoingLabel('');
        setDoneLabel('');
        setViewCharts(false);
    };

    const handleChangeToDoLabel = (value) => {
        if (value)
            setToDoLabel(value);
        else
            setToDoLabel('');
    };

    const handleChangeDoingLabel = (value) => {
        if (value)
            setDoingLabel(value);
        else
            setDoingLabel('');
    };

    const handleChangeDoneLabel = (value) => {
        if (value)
            setDoneLabel(value);
        else
            setDoneLabel('');
    };

    const handleChangeMilestone = (value) => {
        setMilestone(value);
        if (value) {
            async function fetchData() {
                try {
                    let someIssues = await RequestGitLab.fetchIssues(AuthService.getCurrentUser(), project, value);
                    someIssues = await SortUtility.sortIssues(someIssues, project, doingLabel, doneLabel);
                    setIssues(someIssues);
                } catch (error) {
                    setAlert({ severity: 'error', message: error.message });
                }
            }
            fetchData();
        }
        else {
            setMilestone('');
        }
        setIssues([]);
        setViewCharts(false);
    };

    const handleSetDataChart = async () => {
        setOpenProgress(true);
        SettingsService.saveLastSettings(group, project, toDoLabel, doingLabel, doneLabel, milestone);
        setDataColumnChart(ColumnChartUtility.handleSetDataColumnChart(issues));
        setDataLineChart(LineChartUtility.handleSetDataLineChart(issues));
        setDataAreaChart(await AreaChartUtility.handleSetDataAreaChart(issues, project, toDoLabel, doingLabel, doneLabel));
        setOpenProgress(false);
        setViewCharts(true);
    }

    const handleUseLastSettings = async () => {
        setOpenProgress(true);
        let settings = SettingsService.getLastSettings();
        await handleChangeGroup(settings.group);
        await handleChangeProject(settings.project);
        await handleChangeToDoLabel(settings.labels.todo);
        await handleChangeDoingLabel(settings.labels.doing);
        await handleChangeDoneLabel(settings.labels.done);
        //await handleChangeMilestone(settings.milestone);
        setOpenProgress(false);
    }

    const renderSelectGroup = group => {
        const children = group.children.map(aChild => {
            return (
                <MenuItem key={aChild.id} value={aChild.id}>{aChild.full_name}</MenuItem>
            );
        });
        return [<ListSubheader style={{ pointerEvents: 'none' }} >{group.full_name}</ListSubheader>, children];
    };

    return (
        <div className={classes.root}>

            <div className={classes.options}>

                <FormControl className={classes.formControl}>
                    <InputLabel color='secondary' id='group-input'>Group</InputLabel>
                    <Select
                        id='group-select'
                        color='secondary'
                        value={group}
                        onChange={event => handleChangeGroup(event.target.value)}
                    >
                        <MenuItem value={null}>-</MenuItem>
                        {groups.map(aGroup => renderSelectGroup(aGroup))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel color='secondary' id='project-input'>Project</InputLabel>
                    <Select
                        id='project-select'
                        color='secondary'
                        value={project}
                        onChange={event => handleChangeProject(event.target.value)}
                    >
                        <MenuItem value={null}>-</MenuItem>
                        {projects.map((aProject) => (
                            <MenuItem key={aProject.id} value={aProject.id}>{aProject.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel color='secondary' id="todo-label-input">To Do Label</InputLabel>
                    <Select
                        id="todo-label-select"
                        color='secondary'
                        value={toDoLabel}
                        onChange={event => handleChangeToDoLabel(event.target.value)}
                        input={<Input id="select-label-todo-chip" />}
                    >
                        <MenuItem value={null}>-</MenuItem>
                        {labels.map((aLabel) => (
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
                        value={doingLabel}
                        onChange={event => handleChangeDoingLabel(event.target.value)}
                        input={<Input id="select-label-doing-chip" />}
                    >
                        <MenuItem value={null}>-</MenuItem>
                        {labels.map((aLabel) => (
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
                        value={doneLabel}
                        onChange={event => handleChangeDoneLabel(event.target.value)}
                        input={<Input id="select-label-done-chip" />}
                    >
                        <MenuItem value={null}>-</MenuItem>
                        {labels.map((aLabel) => (
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
                        value={milestone}
                        onChange={event => handleChangeMilestone(event.target.value)}
                    >
                        <MenuItem value={null}>-</MenuItem>
                        {milestones.map((aMilestone) => (
                            <MenuItem key={aMilestone.id} value={aMilestone.title}>{aMilestone.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </div >
            <div className={classes.buttons}>
                <FormControl className={classes.formControl}>
                    <Button color='secondary' onClick={() => handleUseLastSettings()}>Use last config</Button>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <Button variant='contained' color='secondary' onClick={() => handleSetDataChart()}
                        disabled={!milestone || !toDoLabel || !doingLabel || !doneLabel || !project || !group}>
                        Generate Charts
                    </Button>
                </FormControl>
            </div>
            {
                viewCharts ?
                    <div className={classes.charts
                    } >
                        <Chart
                            width='100%'
                            height='400px'
                            chartType='ColumnChart'
                            loader={<LinearProgress />}
                            data={dataColumnChart}
                            options={{
                                title: 'Comparative Issues Chart',
                                titleTextStyle: { color: theme.palette.text.primary },
                                backgroundColor: theme.palette.background.default,
                                hAxis: {
                                    title: 'Issues',
                                    titleTextStyle: { color: theme.palette.text.primary },
                                    textStyle: { color: theme.palette.text.primary },
                                    baselineColor: { color: theme.palette.text.primary },
                                    minValue: 0
                                },
                                vAxis: {
                                    title: 'Hours',
                                    titleTextStyle: { color: theme.palette.text.primary },
                                    textStyle: { color: theme.palette.text.primary },
                                    gridlines: { color: theme.palette.text.secondary },
                                    baselineColor: { color: theme.palette.text.primary },
                                    minValue: 0
                                },
                                legend: {
                                    textStyle: { color: theme.palette.text.primary }
                                }
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />

                        <Chart
                            width='100%'
                            height='400px'
                            chartType='LineChart'
                            loader={<LinearProgress />}
                            data={dataLineChart}
                            options={{
                                title: 'Burndown Chart',
                                titleTextStyle: { color: theme.palette.text.primary },
                                backgroundColor: theme.palette.background.default,
                                lineWidth: 5,
                                hAxis: {
                                    title: 'Business Days',
                                    titleTextStyle: { color: theme.palette.text.primary },
                                    textStyle: { color: theme.palette.text.primary },
                                    gridlines: { color: theme.palette.text.secondary, count: dataLineChart.length },
                                    baselineColor: { color: theme.palette.text.primary },
                                    minValue: 0
                                },
                                vAxis: {
                                    title: 'Total Hours Estimated',
                                    titleTextStyle: { color: theme.palette.text.primary },
                                    textStyle: { color: theme.palette.text.primary },
                                    gridlines: { color: theme.palette.text.secondary },
                                    baselineColor: { color: theme.palette.text.primary },
                                    minValue: 0
                                },
                                legend: {
                                    textStyle: { color: theme.palette.text.primary }
                                }
                            }}
                            rootProps={{ 'data-testid': '2' }}
                        />

                        <Chart
                            width='100%'
                            height='400px'
                            chartType='AreaChart'
                            loader={<LinearProgress />}
                            data={dataAreaChart}
                            options={{
                                isStacked: true,
                                title: 'Cumulative Flow Chart',
                                titleTextStyle: { color: theme.palette.text.primary },
                                backgroundColor: theme.palette.background.default,
                                lineWidth: 5,
                                hAxis: {
                                    title: 'Business Days',
                                    titleTextStyle: { color: theme.palette.text.primary },
                                    textStyle: { color: theme.palette.text.primary },
                                    gridlines: { color: theme.palette.text.secondary, count: dataAreaChart.length },
                                    baselineColor: { color: theme.palette.text.primary },
                                    minValue: 0
                                },
                                vAxis: {
                                    title: 'Amount of Issues',
                                    titleTextStyle: { color: theme.palette.text.primary },
                                    textStyle: { color: theme.palette.text.primary },
                                    gridlines: { color: theme.palette.text.secondary },
                                    baselineColor: { color: theme.palette.text.primary },
                                    minValue: 0
                                },
                                legend: {
                                    textStyle: { color: theme.palette.text.primary }
                                }
                            }}
                            rootProps={{ 'data-testid': '3' }}
                        />
                    </div >
                    : <div />
            }
            <Backdrop className={classes.backdrop} open={openProgress} >
                <CircularProgress color='inherit' />
            </Backdrop>
            {
                alert.severity ?
                    <Alert severity={alert.severity}>{alert.message}</Alert>
                    : <div />
            }
        </div >
    );
}

export default Home;
