import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { fetchOrderById, fetchOrders } from '../api/order';

export const useOrderData = (
	page,
	per_page,
	sortBy = 'id',
	sortDir = 'ASC'
) => {
	const { authState } = useAuthContext();
	const { token } = authState;

	return useQuery({
		queryKey: ['orders', page, per_page, sortBy, sortDir],
		queryFn: () => fetchOrders(token, page, per_page, sortBy, sortDir),
		placeholderData: keepPreviousData,
		enabled: !!token,
		staleTime: 360000,
	});
};

export const useOneOrderData = (id) => {
	const { authState } = useAuthContext();
	const { token } = authState;

	return useQuery({
		queryKey: ['order', id],
		queryFn: () => fetchOrderById(token, id),
		placeholderData: keepPreviousData,
		enabled: !!token,
		staleTime: 360000,
	});
};
