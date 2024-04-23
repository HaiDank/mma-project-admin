import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { deleteUser, getUserById, getUsers, registerUser } from '../api/user';
import { Alert } from 'react-native';

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

export const useCreateUser = () => {
	const { authState } = useAuthContext();

	const queryClient = useQueryClient();
	const { token } = authState;

	return useMutation({
		mutationFn: ({ email, password, name, dob, gender, image_url }) =>
			registerUser(email, password, name, dob, gender, false, image_url),
		onSuccess: (data, variables, context) => {
			Alert.alert(
				'',
				'User created successfully',
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
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});
};
