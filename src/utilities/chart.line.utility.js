import CommonUtility from './common.utility';

const moment = require('moment');

/**
 * prepare the structure and build all the data to use in the Burndown Chart
 **/
const handleSetDataLineChart = (issues) => {

    let data = [];
    data.push(['x', 'Estimated', 'Spent']);

    let hoursEstimate = CommonUtility.fullTimeEstimate(issues);
    let sprintDays = CommonUtility.getSprintDays(issues[0].milestone.start_date, issues[0].milestone.due_date);
    let businessDays = sprintDays.filter((aDay) => { return aDay.getDay() > 0 && aDay.getDay() < 6 });
    let estimatePerDay = (hoursEstimate / businessDays.length);
    let diagonalEstimate = hoursEstimate;
    let diagonalSpent = hoursEstimate;

    let closedCardEstimate = CommonUtility.getCardsByDay(issues, sprintDays);
    let index = 0;

    let today = new Date();
    let finishSprint = sprintDays[sprintDays.length - 1];
    let lastDay;
    if (CommonUtility.sprintInProgress(today, finishSprint))
        lastDay = CommonUtility.getSprintDays(issues[0].milestone.start_date, today).length;

    data.push([0, diagonalEstimate, diagonalSpent]);

    while (index < sprintDays.length) {
        if (sprintDays[index].getDay() > 0 && sprintDays[index].getDay() < 6) {
            diagonalEstimate -= estimatePerDay;
        }

        diagonalSpent -= closedCardEstimate[index];

        if (diagonalEstimate < 0)
            diagonalEstimate = 0;

        //        if (sprintDays[index].getDay() > lastDay - 1) {

        if (index > lastDay - 2) {
            diagonalSpent = null;
        }
        let issue = [
            index + 1,
            diagonalEstimate,
            diagonalSpent
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