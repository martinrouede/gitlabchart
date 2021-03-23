import Cookies from 'js-cookie'

/**
 * set the user cookie. User is logged in
 **/
const login = async (serverUrl, privateToken) => {
	let data = { url: serverUrl, token: privateToken }
	Cookies.set('user', JSON.stringify(data), { expires: 365 });
}

/**
 * remove the user cookie. User is logged out
 **/
const logout = async () => {
	Cookies.remove('user');
	Cookies.remove('settings');
	window.location.reload();
}

/**
 * get the info of user logged in
 **/
const getCurrentUser = () => {
	return Cookies.getJSON('user');
}

/**
 * verify if there are a user logged in
 **/
const isAuthenticated = () => {
	return Cookies.getJSON('user');
}

const service = {
	login,
	logout,
	getCurrentUser,
	isAuthenticated
}

export default service;
