import Cookies from 'js-cookie'

/**
 * set the setting in the cookie
 **/
const saveLastSettings = async (group, project, todoLabel, doingLabel, doneLabel, milestone) => {
    let labels = { todo: todoLabel, doing: doingLabel, done: doneLabel };
    let data = { group: group, project: project, labels: labels, milestone: milestone }
    Cookies.set('settings', JSON.stringify(data), { expires: 365 });
}

/**
 * get the setting saved in the cookie
 **/
const getLastSettings = () => {
    return Cookies.getJSON('settings');
}

const service = {
    saveLastSettings,
    getLastSettings
}

export default service;