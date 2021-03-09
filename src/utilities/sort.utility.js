import AuthService from '../services/auth.service';
import RequestGitLab from '../services/request.gitlab.service';
import CommonUtility from './common.utility';

/**
 * converts a flat array of gitlab groups into a tree with parent groups and child groups
 **/
const sortGroups = async (groups) => {
    let parents = [];
    for (let i = 0; i < groups.length; i++) {
        groups[i].children = [];
        if (!groups[i].parent_id)
            parents.push(groups[i]);
    }

    for (let i = 0; i < groups.length; i++) {
        if (groups[i].parent_id) {
            let index = CommonUtility.findIndexParent(parents, groups[i].parent_id);
            parents[index].children.push(groups[i]);
        }
    }

    return parents;
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
            } else {
                if (element.action === 'remove' && element.label.name === doingLabel.name) {
                    issue.moveDone = element.created_at;
                }
            }
        }
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