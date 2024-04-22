import axios from 'axios';
import {
	BASE_URL,
	DELETE_USER_URL,
	GET_USER_BY_ID_URL,
	GET_USERS_URL,
	POST_USER_REGISTER_URL,
	PUT_UPDATE_USER_URL,
} from './constants';

export const getUsers = async (
	token,
	page = 0,
	per_page =2,
	sortBy = 'name',
	sortDir = 'ASC',
	email ='',
	role = 'STAFF',
	gender ='',
) => {
	const result = await axios
		.get(
			BASE_URL +
				GET_USERS_URL +
				`?page=${page}&per_page=${per_page}&sortBy=${sortBy}&sortDir=${sortDir}&email=${email}&role=${role}&gender=${gender}`,
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		)
		.then((res) => {
			console.log('asdaw ', res.data);
			return res.data.payload;
		})
		.catch((err) => {
			console.log(err);
			console.log('err ', token);
			return [];
		});
	return result;
};

export const getUserById = async (id) => {
	const result = await axios
		.get(BASE_URL + GET_USER_BY_ID_URL + id)
		.then((res) => {
			console.log(res);
			return res;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});
	return result;
};

export const updateUser = async ({
	id,
	email,
	password,
	name,
	dob,
	gender,
	banned,
	image,
}) => {
	const result = await axios
		.put(BASE_URL + PUT_UPDATE_USER_URL + id, {
			email: email,
			password: password,
			name: name,
			dob: dob,
			gender: gender,
			banned: banned,
			image_url: image,
		})
		.then((res) => {
			console.log(res);
			return res;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});
	return result;
};

export const deleteUser = async (id) => {
	const result = await axios
		.delete(BASE_URL + DELETE_USER_URL + id)
		.then((res) => {
			console.log(res);
			return res;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});
	return result;
};

export const registerUser = async (
	email,
	password,
	name,
	dob,
	gender,
	banned = false,
	image_url
) => {
	const result = await axios
		.post(BASE_URL + POST_USER_REGISTER_URL, {
			email,
			password,
			name,
			dob,
			gender,
			banned,
			image_url,
		})
		.then((res) => {
			console.log(res);
			return res;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});
	return result;
};
