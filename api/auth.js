import axios from 'axios';
import { BASE_URL, POST_LOGIN_URL } from './constants';

export const loginAPI = async (email, password) => {
    console.log(email)
    console.log(password)
	const result = await axios
		.post(BASE_URL + POST_LOGIN_URL, {
			email: email,
			password: password,
		})
		.then((res) => {
			console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});

	return result;
};
