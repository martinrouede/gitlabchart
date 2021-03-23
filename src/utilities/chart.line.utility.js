import CommonUtility from './common.utility';

const moment = require('moment');

/**
 * prepare the structure and build all the data to use in the Burndown Chart
 **/
const handleSetDataLineChart = (issues) => {

    let data = [];
    data.push(['x', 'Estimated', 'Spent', '']);

    let hoursEstimate = CommonUtility.fullTimeEstimate(issues);
    let businessDays = CommonUtility.getBusinessDays(issues[0].milestone.start_date, issues[0].milestone.due_date);
    let estimatePerDay = (hoursEstimate / businessDays.length);
    let diagonalEstimate = hoursEstimate;
    let diagonalSpent = hoursEstimate;

    let closedCardEstimate = CommonUtility.getCardsByDay(issues, businessDays);

    data.push([0, diagonalEstimate, diagonalSpent, diagonalSpent+1]);

    let index = 0;

    let today = new Date();
    let finishSprint = businessDays[businessDays.length - 1];
    let lastDay;
    if (CommonUtility.sprintInProgress(today, finishSprint))
        lastDay = CommonUtility.getBusinessDays(issues[0].milestone.start_date, today).length;

    while (index < businessDays.length) {
        diagonalEstimate -= estimatePerDay;
        diagonalSpent -= closedCardEstimate[index];

        if (diagonalEstimate < 0)
            diagonalEstimate = 0;
        if (index >= lastDay) {
            diagonalEstimate = null;
            diagonalSpent = null;
        }
        let issue = [
            index + 1,
            diagonalEstimate,
            diagonalSpent,
            diagonalSpent+1
        ]
        data.push(issue);
        index++;
    }

    return data;
}

const utility = {
    handleSetDataLineChart
}

export default utility;