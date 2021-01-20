import CommonUtility from './common.utility';
import RequestGitLab from '../services/request.gitlab.service';
import AuthService from '../services/auth.service';

const moment = require('moment');

const handleSetDataAreaChart = async (issues, project, labels) => {

    let issuesInfo = [];

    for (let index = 0; index < issues.length; index++) {
        let info = {
            issue: issues[index],
            todo: { start: null, end: null },
            doing: { start: null, end: null },
            done: { start: null, end: null },
        };
        let resources = await RequestGitLab.fetchResources(AuthService.getCurrentUser(), project, issues[index].iid);

        info = completeIssuesDateProgress(info, resources, labels);
        issuesInfo.push(info);
    }

    return generateDataForChart(issuesInfo);
}

const completeIssuesDateProgress = (info, resources, labels) => {

    for (let i = 0; i < resources.length; i++) {
        if (resources[i].label.name === labels[0].name) {
            if (resources[i].action === 'add') {
                info.todo.start = resources[i].created_at;
            }
            if (resources[i].action === 'remove') {
                info.todo.end = resources[i].created_at;
            }
        }
        if (resources[i].label.name === labels[1].name) {
            if (resources[i].action === 'add') {
                info.doing.start = resources[i].created_at;
            }
            if (resources[i].action === 'remove') {
                info.doing.end = resources[i].created_at;
            }
        }
        if (resources[i].label.name === labels[2].name) {
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
};

export default utility;