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
        let info = {
            issue: issues[index],
            todo: { start: null, end: null },
            doing: { start: null, end: null },
            done: { start: null, end: null },
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

    let businessDays = CommonUtility.getBusinessDays(issuesInfo[0].issue.milestone.start_date, issuesInfo[0].issue.milestone.due_date);

    let data = [];
    data.push(['Days', 'Done', 'Doing', 'To Do']);

    for (let i = 0; i < businessDays.length; i++) {
        let todo = 0;
        let doing = 0;
        let done = 0;
        for (let index = 0; index < issuesInfo.length; index++) {
            if (moment(new Date(businessDays[i])).isBetween(new Date(issuesInfo[index].todo.start), new Date(issuesInfo[index].todo.end), undefined, '[]')) {
                todo++;
            }
            if (moment(new Date(businessDays[i])).isBetween(new Date(issuesInfo[index].doing.start), new Date(issuesInfo[index].doing.end), undefined, '[]')) {
                doing++;
            }
            if (moment(new Date(businessDays[i])).isBetween(new Date(issuesInfo[index].done.start), new Date(issuesInfo[index].done.end), undefined, '[]')) {
                done++;
            }
        }
        let issue = [
            i,
            done,
            doing,
            todo
        ]
        data.push(issue);
    }

    return data;
}

const utility = {
    handleSetDataAreaChart
}

export default utility;