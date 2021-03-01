import React, { useState, useEffect } from 'react';

import { useTheme } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import ColumnChart from '../charts/ColumnChart';
import LineChart from '../charts/LineChart';
import AreaChart from '../charts/AreaChart';
import Options from '../options/Options';
import RequestGitLab from '../../services/request.gitlab.service';
import AuthServivice from '../../services/auth.service';
import SettingsService from '../../services/settings.service';
import ColumnChartUtility from '../../utilities/chart.column.utility';
import LineChartUtility from '../../utilities/chart.line.utility';
import AreaChartUtility from '../../utilities/chart.area.utility';
import SortUtility from '../../utilities/sort.utility';
import Styles from './Styles';

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

    const currentUser = AuthServivice.getCurrentUser();

    useEffect(() => {
        async function fetchData() {
            try {
                props.setUser(await RequestGitLab.fetchMyUser(currentUser));

                let someGroups = await RequestGitLab.fetchGroups(currentUser);
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
                    let response = await RequestGitLab.fetchProjects(currentUser, value);
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
                    let someMilestones = await RequestGitLab.fetchMilestones(currentUser, value);
                    setMilestones(someMilestones);
                    var amountLabels = 0;
                    var page = 1;
                    var labelsAux = [];
                    while (amountLabels === 20 || amountLabels === 0) {
                        let someLabels = await RequestGitLab.fetchLabels(currentUser, value, page);
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
                    let someIssues = await RequestGitLab.fetchIssues(currentUser, project, value);
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

    const options = {
        groups: groups,
        group: group,
        handleChangeGroup: handleChangeGroup,
        projects: projects,
        project: project,
        handleChangeProject: handleChangeProject,
        labels: labels,
        toDoLabel: toDoLabel,
        handleChangeToDoLabel: handleChangeToDoLabel,
        doingLabel: doingLabel,
        handleChangeDoingLabel: handleChangeDoingLabel,
        doneLabel: doneLabel,
        handleChangeDoneLabel: handleChangeDoneLabel,
        milestones: milestones,
        milestone: milestone,
        handleChangeMilestone: handleChangeMilestone,
        handleSetDataChart: handleSetDataChart,
        handleUseLastSettings: handleUseLastSettings
    }

    return (
        <div className={classes.root}>
            <Options options={options} />
            {
                viewCharts ?
                    <div className={classes.charts} >
                        <ColumnChart data={dataColumnChart} />
                        <LineChart data={dataLineChart} />
                        <AreaChart data={dataAreaChart} />
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
