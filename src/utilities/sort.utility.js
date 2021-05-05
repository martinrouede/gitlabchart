import AuthService from '../services/auth.service';
import RequestGitLab from '../services/restful/request.gitlab.service';
import CommonUtility from './common.utility';

/**
 * converts a flat array of gitlab groups into a tree with parent groups and child groups
 **/
const sortGroups = async (groups) => {
    return groups.sort((a, b) => a.full_name.localeCompare(b.full_name));
}

/**
 * sort issues in order ascending by date of done, its useful for charts
 **/
const sortIssues = async (issues, project, doingLabel, doneLabel) => {
    for (let index = 0; index < issues.length; index++) {
        const issue = issues[index];
        let issueResources = await RequestGitLab.fetchResources(AuthService.getCurrentUser(), project, issue.iid);
        for (let index = 0; index < issueResources.length; index++) {
            const element = issueResources[index];
            if (element.action === 'add' && element.label.name === doneLabel.name) {
                issue.moveDone = element.created_at;
            }
            if (element.action === 'remove' && element.label.name === doingLabel.name) {
                issue.moveDone = element.created_at;
            }
        }
        if (!issue.moveDone)
            issue.moveDone = '-';
    }

    let filterIssues = issues.filter(issue => { return issue.moveDone });

    filterIssues.sort(function compare(a, b) {
        var dateA = new Date(a.moveDone);
        var dateB = new Date(b.moveDone);
        return dateA - dateB;
    });

    return filterIssues;
}

const utility = {
    sortGroups,
    sortIssues
}

export default utility;