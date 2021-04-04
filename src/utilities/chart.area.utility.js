import CommonUtility from './common.utility';
import RequestGitLab from '../services/request.gitlab.service';
import AuthService from '../services/auth.service';

const moment = require('moment');

/**
 * prepare the structure and build all the data to use in the Cumulative Flow Chart
 **/
const handleSetDataAreaChart = async (issues, project, todoLabel, doingLabel, doneLabel) => {

    let issuesInfo = [];

    for (let index = 0; index < issues.length; index++) {
        let today = new Date();
        let info = {
            issue: issues[index],
            todo: { start: today, end: today },
            doing: { start: today, end: today },
            done: { start: today, end: today },
        };
        let resources = await RequestGitLab.fetchResources(AuthService.getCurrentUser(), project, issues[index].iid);

        info = completeIssuesDateProgress(info, resources, todoLabel, doingLabel, doneLabel);
        issuesInfo.push(info);
    }

    return generateDataForChart(issuesInfo);
}

/**
 * add the dates on which each of the issues went from todo to doing and from doing to done
 **/
const completeIssuesDateProgress = (info, resources, todoLabel, doingLabel, doneLabel) => {

    for (let i = 0; i < resources.length; i++) {
        if (resources[i].label.name === todoLabel.name) {
            if (resources[i].action === 'add') {
                info.todo.start = resources[i].created_at;
            }
            if (resources[i].action === 'remove') {
                info.todo.end = resources[i].created_at;
            }
        }
        if (resources[i].label.name === doingLabel.name) {
            if (resources[i].action === 'add') {
                info.doing.start = resources[i].created_at;
            }
            if (resources[i].action === 'remove') {
                info.doing.end = resources[i].created_at;
            }
        }
        if (resources[i].label.name === doneLabel.name) {
            if (resources[i].action === 'add') {
                info.done.start = resources[i].created_at;
            }
            if (resources[i].action === 'remove') {
                info.done.end = resources[i].created_at;
            }
        }
    }

    return info;
}

/**
 * returns the number of issues in each column (todo, doing, done) day by day.
 * For later use this data as input in Cumulative Flow Chart
 **/
const generateDataForChart = (issuesInfo) => {

    let sprintDays = CommonUtility.getSprintDays(issuesInfo[0].issue.milestone.start_date, issuesInfo[0].issue.milestone.due_date);

    let data = [];
    data.push(['Days', 'Done', 'Doing', 'To Do', '']);

    let today = new Date();
    let finishSprint = sprintDays[sprintDays.length - 1];
    let lastDay;
    if (CommonUtility.sprintInProgress(today, finishSprint))
        lastDay = CommonUtility.getSprintDays(issuesInfo[0].issue.milestone.start_date, today).length;

    for (let i = 0; i < sprintDays.length; i++) {
        let todo = 0;
        let doing = 0;
        let done = 0;
        let day = new Date(sprintDays[i]);
        for (let index = 0; index < issuesInfo.length; index++) {
            if (moment(day).isBetween(new Date(issuesInfo[index].todo.start), new Date(issuesInfo[index].todo.end), undefined, '[]')) {
                todo++;
            }
            if (moment(day).isBetween(new Date(issuesInfo[index].doing.start), new Date(issuesInfo[index].doing.end), undefined, '[]')) {
                doing++;
            }
            if (moment(day).isBetween(new Date(issuesInfo[index].done.start), new Date(issuesInfo[index].done.end), undefined, '[]')) {
                done++;
            }
        }
        if (i >= lastDay - 1) {
            done = null;
            doing = null;
            todo = null;
        }
        let issue = [
            i,
            done,
            doing,
            todo,
            1
        ]
        data.push(issue);
    }

    return data;
}

const utility = {
    handleSetDataAreaChart
}

export default utility;