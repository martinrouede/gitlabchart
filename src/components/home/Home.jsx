import { useState, useEffect } from 'react';

import { useTheme } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import Styles from './Styles';
import ColumnChart from '../charts/ColumnChart';
import LineChart from '../charts/LineChart';
import AreaChart from '../charts/AreaChart';
import LabelSelect from '../options/LabelSelect';
import GroupSelect from '../options/GroupSelect';
import ProjectSelect from '../options/ProjectSelect';
import MilestoneSelect from '../options/MilestoneSelect';
import RequestGitLab from '../../services/restful/request.gitlab.service';
import RequestGitLabGraphQL from '../../services/graphql/request.gitlab.service';
import AuthService from '../../services/auth.service';
import SettingsService from '../../services/settings.service';
import ColumnChartUtility from '../../utilities/chart.column.utility';
import LineChartUtility from '../../utilities/chart.line.utility';
import AreaChartUtility from '../../utilities/chart.area.utility';
import SortUtility from '../../utilities/sort.utility';
import AlertDialog from '../dialog/Dialog';

const Home = (props) => {
    const classes = Styles.useStyles();
    const theme = useTheme();

    const [openProgress, setOpenProgress] = useState(false);
    const [viewCharts, setViewCharts] = useState(false);
    const [alert, setAlert] = useState({ open: '', message: '' });

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

    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        async function fetchData() {
            try {
                props.setUser(await RequestGitLab.fetchMyUser(currentUser));

                let someGroups = await RequestGitLab.fetchGroups(currentUser);
                someGroups = await SortUtility.sortGroups(someGroups);
                setGroups(someGroups);
            } catch (error) {
                setAlert({ open: true, message: error.message });
            }
        }
        fetchData();
    }, []);

    const handleChangeGroup = (value) => {
        if (value) {
            setGroup(value);
            async function fetchData() {
                try {
                    console.log(await RequestGitLabGraphQL.fetchAllIssues(currentUser));
                    let response = await RequestGitLab.fetchProjects(currentUser, value);
                    setProjects(response);
                } catch (error) {
                    setAlert({ open: true, message: error.message });
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
    }

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
                    setAlert({ open: true, message: error.message });
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
    }

    const handleChangeToDoLabel = (value) => {
        if (value)
            setToDoLabel(value);
        else
            setToDoLabel('');
    }

    const handleChangeDoingLabel = (value) => {
        if (value)
            setDoingLabel(value);
        else
            setDoingLabel('');
    }

    const handleChangeDoneLabel = (value) => {
        if (value)
            setDoneLabel(value);
        else
            setDoneLabel('');
    }

    const handleChangeMilestone = (value) => {
        setMilestone(value);
        if (value) {
            async function fetchData() {
                try {
                    let someIssues = await RequestGitLab.fetchIssues(currentUser, project, value);
                    someIssues = await SortUtility.sortIssues(someIssues, project, doingLabel, doneLabel);
                    setIssues(someIssues);
                } catch (error) {
                    setAlert({ open: true, message: error.message });
                }
            }
            fetchData();
        }
        else {
            setMilestone('');
        }
        setIssues([]);
        setViewCharts(false);
    }

    const handleUseLastSettings = async () => {
        try {
            setOpenProgress(true);
            let settings = SettingsService.getLastSettings();
            if (settings) {
                await handleChangeGroup(settings.group);
                await handleChangeProject(settings.project);
                await handleChangeToDoLabel(settings.labels.todo);
                await handleChangeDoingLabel(settings.labels.doing);
                await handleChangeDoneLabel(settings.labels.done);
                //await handleChangeMilestone(settings.milestone);
            }
            setOpenProgress(false);
        } catch (error) {
            setAlert({ open: true, message: error.message });
        }
    }

    const handleSetDataChart = async () => {
        try {
            setOpenProgress(true);
            SettingsService.saveLastSettings(group, project, toDoLabel, doingLabel, doneLabel, milestone);
            setDataColumnChart(ColumnChartUtility.handleSetDataColumnChart(issues));
            setDataLineChart(LineChartUtility.handleSetDataLineChart(issues));
            setDataAreaChart(await AreaChartUtility.handleSetDataAreaChart(issues, project, toDoLabel, doingLabel, doneLabel));
            setOpenProgress(false);
            setViewCharts(true);
        } catch (error) {
            setAlert({ open: true, message: error.message });
        }
    }

    return (
        <div className={classes.root}>
            <GroupSelect value={group} nameLabel={'Groups'} handleChange={handleChangeGroup} groups={groups} />
            <ProjectSelect value={project} nameLabel={'Projects'} handleChange={handleChangeProject} options={projects} />
            <LabelSelect valueLabel={toDoLabel} nameLabel={'To Do Label'} handleChangeLabel={handleChangeToDoLabel} labels={labels} />
            <LabelSelect valueLabel={doingLabel} nameLabel={'Doing Label'} handleChangeLabel={handleChangeDoingLabel} labels={labels} />
            <LabelSelect valueLabel={doneLabel} nameLabel={'Done Label'} handleChangeLabel={handleChangeDoneLabel} labels={labels} />
            <MilestoneSelect value={milestone} nameLabel={'Milestones'} handleChange={handleChangeMilestone} options={milestones} />
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
                    <div className={classes.charts} >
                        <ColumnChart data={dataColumnChart} />
                        <LineChart data={dataLineChart} />
                        <AreaChart data={dataAreaChart} colors={[doneLabel.color, doingLabel.color, toDoLabel.color, theme.palette.background.default]} />
                    </div >
                    : <div />
            }
            <Backdrop className={classes.backdrop} open={openProgress} >
                <CircularProgress color='inherit' />
            </Backdrop>
            {
                alert.open ?
                    <AlertDialog alert={alert} setAlert={setAlert}></AlertDialog>
                    : <div />
            }
        </div >
    );
}

export default Home;
