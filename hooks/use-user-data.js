import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { getUsers } from '../api/user';

export const useUserData = (page, per_page, sortBy='name', sortDir='ASC', email='', role='CUSTOMER', gender='') => {
	const { authState } = useAuthContext();
	const { token } = authState;

	return useQuery({
		queryKey: [
			'users',
			page,
			per_page,
			sortBy ,
			sortDir,
			email,
			role,
			gender,
		],
		queryFn: () =>
			getUsers(
				token,
				page,
				per_page,
				sortBy,
				sortDir,
				email,
				role,
				gender
			),
		placeholderData: keepPreviousData,
		enabled: !!token,
		staleTime: 360000,
	});
};


export const useDeleteUser = (id) => {

	const {authState} = useAuthContext()

	const {token} = authState

	return useMutation({

	})
}