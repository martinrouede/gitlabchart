import Cookies from 'js-cookie'

/**
 * set the user cookie. User is logged in
 **/
const login = async (serverUrl, privateToken) => {
	let data = { url: serverUrl, token: privateToken }
	Cookies.set('user', JSON.stringify(data));
}

/**
 * remove the user cookie. User is logged out
 **/
const logout = async () => {
	Cookies.remove('user');
	window.location.reload();
}

/**
 * get the info of user logged in
 **/
const getCurrentUser = () => {
	let userJson = Cookies.get('user');

	if (userJson == null)
		return false;

	return JSON.parse(Cookies.get('user'));
}

/**
 * verify if there are a user logged in
 **/
const isAuthenticated = () => {
	let userJson = Cookies.get('user');
	if (userJson == null)
		return false;

	let user = JSON.parse(userJson);
	return (user != null);
}

const service = {
	login,
	logout,
	getCurrentUser,
	isAuthenticated
}

export default service;
