import CommonUtility from './common.utility';

/**
 * prepare the structure and build all the data to use in the Burndown Chart
 **/
const handleSetDataLineChart = (issues) => {

    let data = [];
    data.push(['x', 'Estimated', 'Spent']);

    let hoursEstimate = CommonUtility.fullTimeEstimate(issues);
    let businessDays = CommonUtility.getBusinessDays(issues[0].milestone.start_date, issues[0].milestone.due_date);
    let estimatePerDay = (hoursEstimate / businessDays.length);
    let diagonalEstimate = hoursEstimate;
    let diagonalSpent = hoursEstimate;

    let closedCardEstimate = CommonUtility.getCardsByDay(issues, businessDays);

    data.push([0, diagonalEstimate, diagonalSpent]);

    let index = 0;
    while (index < businessDays.length) {
        diagonalEstimate -= estimatePerDay;
        if (diagonalEstimate < 0)
            diagonalEstimate = 0;
        diagonalSpent -= closedCardEstimate[index];
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