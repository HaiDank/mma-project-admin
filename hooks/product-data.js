import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { getProducts } from '../api/product';

export const productData = (page = 0, per_page = 3, sortBy = 'id',sortDir = 'ASC',productName = '',code = '',categoryId = '',active = 'true') => {
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
            ),
            placeholderData: keepPreviousData,
            enabled: !!token,
            staleTime: 360000,

    });
};

export const useDeleteProduct = (id) => {

	const {authState} = useAuthContext()

	const {token} = authState

	return useMutation({

	})
}