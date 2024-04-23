import axios from 'axios';

import {BASE_URL,
        GET_PRODUCTS_URL, 
        GET_PRODUCTS_BY_ID_URL,
        PUT_UPDATE_PRODUCT_URL,
        POST_PRODUCT_URL,
        POST_PRODUCT_COUNT_URL,
        DELETE_PRODUCT_URL
} from './constants';

export const getProducts = async (
    token,
    page = 0,
    per_page = 3,
    sortBy = '',
    sortDir = 'ASC',
    productName = '',
    code = '',
    categoryId = '',
    active = 'true',
) => {
    const result = await axios
        .get(
            BASE_URL + 
                GET_PRODUCTS_URL +
                `?page=${page}&per_page=${per_page}&sortBy=${sortBy}&sortDir=${sortDir}&productName=${productName}&code=${code}&categoryId${categoryId}&active${active}`,
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
export const getProductById = async (id) => {
	const result = await axios
		.get(BASE_URL + GET_PRODUCTS_BY_ID_URL + id)
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


export const updateProduct = async ({
    id,
    productName,
    quantity,
    description,
    actived = true,
    productImages,
    category_id,
}) => {
    try {
        // Tạo một mảng mới để lưu trữ các hình ảnh theo định dạng mong muốn
        const formattedImages = productImages.map(image => ({
            image_url: image.image_url,
            image_code: image.image_code,
        }));

        const result = await axios.put(
            BASE_URL + PUT_UPDATE_PRODUCT_URL + id,
            {
                productName: productName,
                quantity: quantity,
                description: description,
                actived: actived,
                productImages: formattedImages,
                category_id: category_id,
            }
        );

        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deleteProduct = async (id) => {
    const result = await axios
    .delete(BASE_URL + DELETE_PRODUCT_URL + id)
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

export const createProduct = async ({
    productName,
    quantity,
    description,
    actived = true,
    productImages,
    category_id,
}) => {
    try {
        // Tạo một mảng mới để lưu trữ các hình ảnh theo định dạng mong muốn
        const formattedImages = productImages.map(image => ({
            image_url: image.image_url,
            image_code: image.image_code,
        }));

        const result = await axios.post(
            BASE_URL + POST_PRODUCT_URL,
            {
                productName: productName,
                quantity: quantity,
                description: description,
                actived: actived,
                productImages: formattedImages,
                category_id: category_id,
            }
        );

        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};



