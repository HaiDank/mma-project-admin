import axios from 'axios';
import {
	BASE_URL,
	DELETE_AUCTION_URL,
	GET_AUCTION_BY_ID_URL,
	GET_AUCTIONS_URL,
	POST_CREATE_AUCTION_URL,
	POST_REGISTER_AUCTION_BY_ID,
	PUT_UPDATE_AUCTION_URL,
} from './constants';

export const fetchAuctions = async (token, page, per_page, sortBy, sortDir) => {
	const result = await axios
		.get(
			BASE_URL +
				GET_AUCTIONS_URL +
				`?page=${page}&per_page=${per_page}&sortBy=${sortBy}&sortDir=${sortDir}`,
			{
				headers: { Authorization: 'Bearer ' + token },
			}
		)
		.then((res) => {
			console.log(res);
			return res;
		})
		.catch((err) => {
			console.log(err);
			return null;
		});
	return result;
};

export const fetchAuctionById = async (token, id) => {
	const result = await axios
		.get(BASE_URL + GET_AUCTION_BY_ID_URL + id, {
			headers: { Authorization: 'Bearer ' + token },
		})
		.then((res) => {
			console.log(res);
			return res;
		})
		.catch((err) => {
			console.log(err);
			return null;
		});
	return result;
};

export const deleteAunction = async (token, id) => {
	const result = await axios
		.delete(BASE_URL + DELETE_AUCTION_URL + id, {
			headers: { Authorization: 'Bearer ' + token },
		})
		.then((res) => {
			console.log(res);
			return res;
		})
		.catch((err) => {
			console.log(err);
			return null;
		});
	return result;
};

export const updateAuctionById = async (token) => {
	const result = await axios
		.put(
			BASE_URL + PUT_UPDATE_AUCTION_URL + id,
			{},
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
			return null;
		});
	return result;
};

export const createAuction = async (
	token,
	endDate,
	startDate,
	title,
	depositPrice,
	quantity,
	startPRice,
	remindAt,
	image_url
) => {
	const result = await axios
		.post(
			BASE_URL + POST_CREATE_AUCTION_URL,
			{
				endDate,
				startDate,
				title,
				depositPrice,
				quantity,
				startPRice,
				remindAt,
				image_url,
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
			return null;
		});
	return result;
};
