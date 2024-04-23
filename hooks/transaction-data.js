import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { getTransaction } from '../api/transaction';

export const transactionData = (
	page = 0,
	per_page = 3,
	sortBy = 'id',
	sortDir = 'ASC',
	status = 'PENDING'
) => {
	const { authState } = useAuthContext();
	const { token } = authState;

	return useQuery({
		queryKey: ['transactions', page, per_page, sortBy, sortDir, status],
		queryFn: () =>
			getTransaction(token, page, per_page, sortBy, sortDir, status),
		placeholderData: keepPreviousData,
		enabled: !!token,
		staleTime: 360000,
	});
};
