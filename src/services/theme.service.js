import Cookies from 'js-cookie'

/**
 * set the theme preferences in the cookie
 **/
const setTheme = async (themeMode) => {
    let data = { darkMode: themeMode }
    Cookies.set('theme', JSON.stringify(data), { expires: 365 });
}

/**
 * get the theme preferences saved in the cookie
 **/
const getTheme = () => {
    return Cookies.getJSON('theme');
}

const service = {
    setTheme,
    getTheme
}

export default service;