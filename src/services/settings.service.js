import Cookies from 'js-cookie'

const saveLastSettings = async (group, project, todoLabel, doingLabel, doneLabel, milestone) => {
    let labels = { todo: todoLabel, doing: doingLabel, done: doneLabel };
    let data = { group: group, project: project, labels: labels, milestone: milestone }
    Cookies.set('settings', JSON.stringify(data));
};

const getLastSettings = () => {
    let settingsJson = Cookies.get('settings');

    if (settingsJson)
        return JSON.parse(Cookies.get('settings'));

    return null;
}

const service = {
    saveLastSettings,
    getLastSettings
};

export default service;