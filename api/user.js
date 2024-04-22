import axios from 'axios';
import {
	BASE_URL,
	DELETE_USER_URL,
	GET_USER_BY_ID_URL,
	GET_USERS_URL,
	PUT_UPDATE_USER_URL,
} from './constants';

export const getUsers = async (
	token,
	page,
	per_page,
	sortBy,
	sortDir,
	email,
	role,
	gender
) => {
	const result = await axios
		.get(
			BASE_URL + GET_USERS_URL,
			{
				page,
				per_page,
				sortBy,
				sortDir,
				email,
				role,
				gender,
			},
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		)
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
	gender,
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
