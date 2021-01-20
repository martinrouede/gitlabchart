const moment = require('moment');
const SEG_HORAS = 3600;

const fullTimeEstimate = (issues) => {
    let amountHours = 0;
    for (let index = 0; index < issues.length; index++) {
        const element = issues[index];
        amountHours += element.time_stats.time_estimate;
    }
    return (amountHours / SEG_HORAS);
}

const getCardsByDay = (issues, businessDays) => {
    let hoursClosedPerDay = new Array(businessDays.length);
    for (let index = 0; index < hoursClosedPerDay.length; index++) {
        hoursClosedPerDay[index] = 0;
    }
    let lastMonday;
    for (let index = 0; index < businessDays.length; index++) {
        const element = businessDays[index];
        if (element.getDay() === 1)
            lastMonday = index;
    }
    for (let i = 0; i < issues.length; i++) {
        for (let j = 0; j < businessDays.length; j++) {
            var doneDate = new Date(issues[i].moveDone);
            if (moment(doneDate.setHours(23, 59, 59, 0)).isSame(new Date(businessDays[j]).setHours(23, 59, 59, 0))) {
                hoursClosedPerDay[j] += (issues[i].time_stats.time_estimate / SEG_HORAS);
            }
        }
        if (doneDate.getDay() === 0 || doneDate.getDay() === 6) {
            if (moment(doneDate.setHours(23, 59, 59, 0)).isBefore(new Date(businessDays[lastMonday]).setHours(23, 59, 59, 0))) {
                hoursClosedPerDay[lastMonday] += (issues[i].time_stats.time_estimate / SEG_HORAS);
            }
            else {
                hoursClosedPerDay[businessDays.length - 1] += (issues[i].time_stats.time_estimate / SEG_HORAS);
            }
        }
    }
    return hoursClosedPerDay;
}

const getBusinessDays = (startDate, endDate) => {
    let dateFrom = moment(startDate).toDate();
    dateFrom = new Date(dateFrom.getTime() + (dateFrom.getTimezoneOffset() * 60000));

    let dateTo = moment(endDate).toDate();
    dateTo = new Date(dateTo.getTime() + (dateTo.getTimezoneOffset() * 60000));

    let currentDay = dateFrom;
    let businessDays = [];
    while (moment(new Date(currentDay).setHours(23, 59, 59, 0)).isBefore(new Date(dateTo).setHours(23, 59, 59, 0))) {
        if (currentDay.getDay() >= 1 && currentDay.getDay() <= 5)
            businessDays.push(new Date(currentDay));
        currentDay.setHours(currentDay.getHours() + 24);
    }

    return businessDays;
}

const findIndexParent = (groups, parentId) => {
    for (let i = 0; i < groups.length; i++) {
        if (groups[i].id === parentId) {
            return i;
        }
    }
}

const utility = {
    SEG_HORAS,
    fullTimeEstimate,
    getCardsByDay,
    getBusinessDays,
    findIndexParent
};

export default utility;