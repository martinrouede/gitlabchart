import Cookies from 'js-cookie'

const setTheme = async (themeMode) => {
    let data = { darkMode: themeMode }
    Cookies.set('theme', JSON.stringify(data));
};

const getTheme = () => {
    let modeJson = Cookies.get('theme');

    if (modeJson)
        return JSON.parse(Cookies.get('theme'));

    return null;
};

const service = {
    setTheme,
    getTheme
};

export default service;