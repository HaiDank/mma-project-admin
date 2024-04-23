import axios from 'axios';
import {
	BASE_URL,
    GET_ORDER_BY_ID_URL,
    GET_ORDERS_URL,
} from './constants';

export const fetchOrders = async (token, page, per_page, sortBy, sortDir) => {
	const result = await axios
		.get(
			BASE_URL +
				GET_ORDERS_URL +
				`?page=${page}&per_page=${per_page}&sortBy=${sortBy}&sortDir=${sortDir}`,
			{
				headers: { Authorization: 'Bearer ' + token },
			}
		)
		.then((res) => {
			console.log('get uaction',res.data.payload);
			return res.data.payload;
		})
		.catch((err) => {
			console.log(err);
			return null;
		});
	return result;
};

export const fetchOrderById = async (token, id) => {
	const result = await axios
		.get(BASE_URL + GET_ORDER_BY_ID_URL + id, {
			headers: { Authorization: 'Bearer ' + token },
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return null;
		});
	return result;
};
