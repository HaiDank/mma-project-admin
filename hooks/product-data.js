import { keepPreviousData, useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { deleteProduct, getProducts, getProductById } from '../api/product';

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
            productName,
            code,
            categoryId,
            active,
            quantity,
            description,
        ],
        queryFn: () =>
            getProducts(
                token,
                page,
                per_page,
                sortBy,
                sortDir,
                productName,
                code,
                categoryId,
                active,
                quantity,
                description,
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

export const useDeleteProduct = (id) => {

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