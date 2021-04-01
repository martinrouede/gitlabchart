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
 * returns how many hours (estimated time of a problem) of work were completed day by day
 **/
const getCardsByDay = (issues, businessDays) => {

    issues = issues.filter((aIssue) => { return aIssue.moveDone !== "-" });

    let hoursClosedPerDay = new Array(businessDays.length);
    for (let index = 0; index < hoursClosedPerDay.length; index++) {
        hoursClosedPerDay[index] = 0;
    }
    
    for (let i = 0; i < issues.length; i++) {
        for (let j = 0; j < businessDays.length; j++) {
            var doneDate = new Date(issues[i].moveDone);
            if (moment(doneDate.setHours(23, 59, 59, 0)).isSame(new Date(businessDays[j]).setHours(23, 59, 59, 0))) {
                hoursClosedPerDay[j] += (issues[i].time_stats.time_estimate / SEG_HORAS);
            }
        }
    }

    return hoursClosedPerDay;
}

/**
 * returns a array with the business days in the interval of dates which receive from params
 **/
const getBusinessDays = (startDate, endDate) => {

    let dateFrom = moment(startDate).toDate();
    dateFrom = new Date(dateFrom.getTime() + (dateFrom.getTimezoneOffset() * 60000));

    let dateTo = moment(endDate).toDate();
    dateTo = new Date(dateTo.getTime() + (dateTo.getTimezoneOffset() * 60000));

    let currentDay = dateFrom;
    let businessDays = [];
    while (moment(new Date(currentDay).setHours(23, 59, 59, 0)).isBefore(new Date(dateTo).setHours(23, 59, 59, 0))) {
        businessDays.push(new Date(currentDay));
        currentDay.setHours(currentDay.getHours() + 24);
    }

    return businessDays;
}

/**
 * returns the index of the parent in the array of gitlab groups
 **/
const findIndexParent = (groups, parentId) => {

    for (let i = 0; i < groups.length; i++) {
        if (groups[i].id === parentId) {
            return i;
        }
    }
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
    getBusinessDays,
    findIndexParent,
    sprintInProgress
}

export default utility;