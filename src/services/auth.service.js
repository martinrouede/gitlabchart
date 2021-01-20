import Cookies from 'js-cookie'

const login = async (serverUrl, privateToken) => {
	let data = { url: serverUrl, token: privateToken }
	Cookies.set('user', JSON.stringify(data));
};

const logout = async () => {
	Cookies.remove('user');
	window.location.reload();
};

const getCurrentUser = () => {
	let userJson = Cookies.get('user');

	if (userJson == null)
		return false;

	return JSON.parse(Cookies.get('user'));
};

const isAuthenticated = () => {
	let userJson = Cookies.get('user');
	if (userJson == null)
		return false;

	let user = JSON.parse(userJson);
	return (user != null);
};

const service = {
	login,
	logout,
	getCurrentUser,
	isAuthenticated
};

export default service;
