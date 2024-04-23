import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import {
	createAuction,
	deleteAuction,
	fetchAuctionById,
	fetchAuctions,
	updateAuctionById,
} from '../api/auction';
import { Alert } from 'react-native';

export const useAuctionData = (
	page,
	per_page,
	sortBy = 'id',
	sortDir = 'ASC'
) => {
	const { authState } = useAuthContext();
	const { token } = authState;

	return useQuery({
		queryKey: ['auctions', page, per_page, sortBy, sortDir],
		queryFn: () => fetchAuctions(token, page, per_page, sortBy, sortDir),
		placeholderData: keepPreviousData,
		enabled: !!token,
		staleTime: 360000,
	});
};

export const useOneAuctionData = (id) => {
	const { authState } = useAuthContext();
	const { token } = authState;

	return useQuery({
		queryKey: ['auction', id],
		queryFn: () => fetchAuctionById(token, id),
		placeholderData: keepPreviousData,
		enabled: !!token,
		staleTime: 360000,
	});
};

export const useDeleteAuction = () => {
	const { authState } = useAuthContext();

	const queryClient = useQueryClient();
	const { token } = authState;

	return useMutation({
		mutationFn: ({ id }) => deleteAuction(token, id),
		onSuccess: (data, variables, context) => {
			Alert.alert(
				'',
				'Auction deleted!',
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
			queryClient.invalidateQueries({ queryKey: ['auctions'] });
			queryClient.invalidateQueries({ queryKey: ['auction', id] });
		},
	});
};

export const useApproveAuction = () => {
	const { authState } = useAuthContext();

	const queryClient = useQueryClient();
	const { token } = authState;

	return useMutation({
		mutationFn: ({ auction }) => updateAuctionById(token, auction),
		onSuccess: (data, variables, context) => {
			console.log('auction edited, invalidating');
			Alert.alert(
				'',
				'Auction validated',
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
			queryClient.invalidateQueries({ queryKey: ['auctions'] });
			queryClient.invalidateQueries({ queryKey: ['auction', id] });
		},
	});
};

export const useCreateAuction = () => {
	const { authState } = useAuthContext();

	const queryClient = useQueryClient();
	const { token } = authState;

	return useMutation({
		mutationFn: ({
			endDate,
			startDate,
			title,
			depositPrice,
			quantity,
			startPrice,
			remindAt,
			productID,
			image_url,
		}) =>
			createAuction(
				token,
				endDate,
				startDate,
				title,
				depositPrice,
				quantity,
				startPrice,
				remindAt,
				productID,
				image_url
			),
		onSuccess: (data, variables, context) => {
			Alert.alert(
				'',
				'Auction created!',
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
			queryClient.invalidateQueries({ queryKey: ['auctions'] });
			queryClient.invalidateQueries({ queryKey: ['auction', id] });
		},
	});
};
