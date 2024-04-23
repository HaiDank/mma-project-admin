import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { deleteUser, getUserById, getUsers } from '../api/user';

export const useUserData = (
	page,
	per_page,
	sortBy = 'name',
	sortDir = 'ASC',
	email = '',
	role = 'CUSTOMER',
	gender = ''
) => {
	const { authState } = useAuthContext();
	const { token } = authState;

	return useQuery({
		queryKey: [
			'users',
			page,
			per_page,
			sortBy,
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

export const useOneUserData = (id) => {
	const { authState } = useAuthContext();
	const { token } = authState;

	return useQuery({
		queryKey: ['user', id],
		queryFn: () => getUserById(token, id),
		placeholderData: keepPreviousData,
		enabled: !!token,
		staleTime: 360000,
	});
};

export const useDeleteUser = () => {
	const { authState } = useAuthContext();

	const queryClient = useQueryClient();
	const { token } = authState;

	return useMutation({
		mutationFn: ({ id }) => deleteUser(token, id),
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});
};
