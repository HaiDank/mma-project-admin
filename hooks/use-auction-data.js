import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import { fetchAuctions } from "../api/auction";

export const useAuctionData = (
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
			'auctions',
			page,
			per_page,
			sortBy,
			sortDir,
		],
		queryFn: () =>
			fetchAuctions(
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

export const useOneAuctionData = (id) => {
	const { authState } = useAuthContext();
	const { token } = authState;

	return useQuery({
		queryKey: ['auction', id],
		queryFn: () => getAuctionById(token, id),
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
			queryClient.invalidateQueries({ queryKey: ['auctions'] });
		},
	});
};
