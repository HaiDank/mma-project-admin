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
			return res.data.payload;
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
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return null;
		});
	return result;
};

export const deleteAuction = async (token, id) => {
	console.log('deleting auction', id);
	const result = await axios
		.delete(BASE_URL + DELETE_AUCTION_URL + id, {
			headers: { Authorization: 'Bearer ' + token },
		})
		.then((res) => {
			console.log(res.data);
			return res;
		})
		.catch((err) => {
			console.log(err);
			return null;
		});
	return result;
};

export const updateAuctionById = async (token, auction) => {
	const result = await axios
		.put(
			BASE_URL + PUT_UPDATE_AUCTION_URL + auction.id,
			{ auction },
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		)
		.then((res) => {
			console.log(res.data);
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
	startPrice,
	remindAt,
	productID,
	image_url
) => {
	const result = await axios
		.post(
			BASE_URL + POST_CREATE_AUCTION_URL,
			{
				endDate: endDate,
				startDate: startDate,
				title: title,
				depositPrice: +depositPrice,
				quantity: +quantity,
				startPrice: +startPrice,
				remindAt: remindAt,
				image_url: image_url,
				productID: +productID,
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
