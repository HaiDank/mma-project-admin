import { keepPreviousData, useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { deleteProduct, getProducts, getProductById, createProduct } from '../api/product';
import { Alert } from 'react-native';

export const productData = (page = 0, per_page = 3, sortBy = 'id',sortDir = 'ASC',productName = '',code = '',categoryId = '',active = 'true', quantity = '', description = '',) => {
    const { authState } = useAuthContext();
    const { token } = authState;
    console.log(token);

    return useQuery({
        queryKey: [
            'products',
            page,
            per_page,
            sortBy,
            sortDir,
        ],
        queryFn: () =>
            getProducts(
                token,
                page,
                per_page,
                sortBy,
                sortDir,
            ),
            placeholderData: keepPreviousData,
            enabled: !!token,
            staleTime: 360000,

    });
};
export const useOneProductData = (id) => {
	const { authState } = useAuthContext();
	const { token } = authState;

	return useQuery({
		queryKey: ['product', id],
		queryFn: () => getProductById(token, id),
		placeholderData: keepPreviousData,
		enabled: !!token,
		staleTime: 360000,
	});
};

export const useDeleteProduct = () => {

	const {authState} = useAuthContext();
    const queryClient = useQueryClient();
	const {token} = authState;

	return useMutation({
        mutationFn: ({ id }) => deleteProduct(token, id),
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
		},
	})
}

export const useCreateProduct = () => {

	const {authState} = useAuthContext();
    const queryClient = useQueryClient();
	const {token} = authState;

	return useMutation({
        mutationFn: ({ product }) => createProduct(token, product),
		onSuccess: (data, variables, context) => {
            Alert.alert(
				'',
				'Product created successfully',
				[
					{
						text: 'Ok',
						onPress: () => console.log('Cancel Pressed'),
						style: 'cancel',
					},
				],
				{
					cancelable: true,
				}
			);
			queryClient.invalidateQueries({ queryKey: ['products'] });
		},
	})
}