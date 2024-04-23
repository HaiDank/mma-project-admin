import axios from "axios";

import {BASE_URL, GET_TRANSACTION_URL} from './constants';

export const getTransaction = async (
    token,
    page = 0,
    per_page = 3,
    sortBy = 'id',
    sortDir = 'ASC',
    walledId = '',
    paymentMethod = 'CARD',
    status = 'PENDING',
    content = '',
    transactionCode = '',
    orderId = '',
    userId = '',
) => {
    const result = await axios
        .get(
            BASE_URL + 
                GET_TRANSACTION_URL +
                `?page=${page}&per_page=${per_page}&sortBy=${sortBy}&sortDir=${sortDir}&walledId=${walledId}&paymentMethod=${paymentMethod}&status${status}&content${content}&transactionCode${transactionCode}&orderId${orderId}&userId${userId}`,
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
}


