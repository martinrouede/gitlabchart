const moment = require('moment');
const SEG_HORAS = 3600;

/**
 * calculate which is the total of hours estimate in the milestone
 **/
const fullTimeEstimate = (issues) => {

    let amountHours = 0;
    for (let index = 0; index < issues.length; index++) {
        const element = issues[index];
        amountHours += element.time_stats.time_estimate;
    }

    return (amountHours / SEG_HORAS);
}

/**
 * returns how many hours (estimated time of a issue) of work were completed day by day
 **/
const getCardsByDay = (issues, sprintDays) => {

    issues = issues.filter((aIssue) => { return aIssue.moveDone !== "-" });
    let hoursClosedPerDay = new Array(sprintDays.length);
    for (let index = 0; index < hoursClosedPerDay.length; index++) {
        hoursClosedPerDay[index] = 0;
    }

    for (let i = 0; i < issues.length; i++) {
        var doneDate = moment.utc(new Date(issues[i].moveDone).setHours(0, 0, 0, 0)).toISOString();
        for (let j = 0; j < sprintDays.length; j++) {
            var sprintDate = moment.utc(new Date(sprintDays[j]).setHours(0, 0, 0, 0)).toISOString();
            if (moment(doneDate).isSame(sprintDate)) {
                hoursClosedPerDay[j] += (issues[i].time_stats.time_estimate / SEG_HORAS);
            }
        }
    }

    return hoursClosedPerDay;
}

/**
 * returns a array with the business days in the interval of dates which receive from params
 **/
const getSprintDays = (startDate, endDate) => {

    let dateFrom = moment(startDate).toDate();
    dateFrom = new Date(dateFrom.getTime() + (dateFrom.getTimezoneOffset() * 60000));

    let dateTo = moment(endDate).toDate();
    dateTo = new Date(dateTo.getTime() + (dateTo.getTimezoneOffset() * 60000));

    let currentDay = dateFrom;
    let sprintDays = [];
    while (moment(new Date(currentDay).setHours(23, 59, 59, 0)).isBefore(new Date(dateTo).setHours(23, 59, 59, 0))) {
        sprintDays.push(new Date(currentDay));
        currentDay.setHours(currentDay.getHours() + 24);
    }

    return sprintDays;
}

/**
 * returns a boolean if in today the sprint is in progress
 **/
const sprintInProgress = (today, dateFinishSprint) => {
    if (moment(today.setHours(23, 59, 59, 0)).isBefore(new Date(dateFinishSprint).setHours(23, 59, 59, 0)))
        return true;
    return false;
}

const utility = {
    SEG_HORAS,
    fullTimeEstimate,
    getCardsByDay,
    getSprintDays,
    sprintInProgress
}

export default utility;