import { View, Text, Image, Button, ScrollView, Alert, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import {
	useApproveAuction,
	useDeleteAuction,
	useOneAuctionData,
} from '../../../../hooks/use-auction-data';
import { router, useLocalSearchParams } from 'expo-router';
import Loader from '../../../../components/Loader';
import { displayDate, displayDateOfBirth } from '../../../../utils/time';

const AuctionDetails = () => {
	const { id } = useLocalSearchParams();
	const { mutate: deleteAuction } = useDeleteAuction();
	const { mutate: approveAuction } = useApproveAuction();

	const { data, error, status } = useOneAuctionData(id);

	const handleConfirmDelete = () => {
		Alert.alert(
			'',
			'Are you sure you want to delete this auction?',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{ text: 'Confirm', onPress: () => handleDelete() },
			],
			{
				cancelable: true,
			}
		);
	};

	const handleDelete = () => {
		deleteAuction({id});
		router.back();
	};

	const handleConfirmApprove = () => {
		Alert.alert(
			'',
			'Are you sure you want to approve this auction?',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{ text: 'Confirm', onPress: () => handleApprove() },
			],
			{
				cancelable: true,
			}
		);
	};

	const handleApprove = () => {
		const auction = data?.payload
		approveAuction({auction});
		router.back();
	};

	const handleViewProduct = () => {
		router.push(`product/${data?.payload.productID}`)
	}

	// useEffect(() => {
	// 	console.log(data);
	// }, [data]);

	return (
		<View className='flex-1 w-full h-full'>
			{status === 'pending' ? (
				<Loader loading={status === 'pending'} />
			) : (
				<ScrollView className='flex-1 p-4 gap-y-2'>
					<View className='flex flex-row items-center '>
						<View className='flex flex-row items-center flex-1'>
							<Text className='font-medium'>ID: </Text>
							<Text className='text-lg'>{data?.payload?.id}</Text>
						</View>
					</View>

					<View className='flex flex-row items-center '>
						<Text className='font-medium'>Auction Title: </Text>
						<Text className='text-lg'>
							{data?.payload?.title}
						</Text>
					</View>

					<View className='flex flex-row items-center w-full '>
						<View className='flex flex-row items-center '>
							<Text className='font-medium'>Status: </Text>
							<Text className='text-lg '>
								{data?.payload.status}
							</Text>
						</View>
					</View>
					<View className='flex'>
						<Text className='text-sm font-bold text-neutral-500'>
							Time frame
						</Text>
					</View>
					<View className='flex flex-row items-center w-full '>
						<View className='flex flex-row items-center flex-1'>
							<Text className='font-medium'>Start Date: </Text>
							<Text className='text-lg'>
								{data?.payload?.startDate
									? displayDateOfBirth(
											data?.payload?.startDate
									  )
									: ''}
							</Text>
						</View>
						<View className='flex flex-row items-center flex-1'>
							<Text className='font-medium'>End Date: </Text>
							<Text className='text-lg'>
								{data?.payload?.endDate
									? displayDateOfBirth(data?.payload?.endDate)
									: ''}
							</Text>
						</View>
					</View>

					<View className='flex flex-row items-center w-full '>
						<View className='flex flex-row items-center '>
							<Text className='font-medium'>Remind At: </Text>
							<Text className='text-lg'>
								{data?.payload?.startDate
									? displayDateOfBirth(
											data?.payload?.remindAt
									  )
									: ''}
							</Text>
						</View>
					</View>

					<View className='flex'>
						<Text className='text-sm font-bold text-neutral-500'>
							Bidding info
						</Text>
					</View>

					<View className='flex flex-row items-center w-full '>
						<View className='flex flex-row items-center flex-1'>
							<Text className='font-medium'>Start Price: </Text>
							<Text className='text-lg'>
								{data?.payload?.startPrice}
							</Text>
						</View>
						<View className='flex flex-row items-center flex-1'>
							<Text className='font-medium'>Deposit Price: </Text>
							<Text className='text-lg'>
								{data?.payload?.depositPrice}
							</Text>
						</View>
					</View>

					<View className='flex flex-row items-center w-full '>
						<View className='flex flex-row items-center flex-1'>
							<Text className='font-medium'>Bidding Price: </Text>
							<Text className='text-lg'>
								{data?.payload?.biddingPrice
									? data?.payload?.biddingPrice
									: 'No bid'}
							</Text>
						</View>
						<View className='flex flex-row items-center flex-1'>
							<Text className='font-medium'>End Price: </Text>
							<Text className='text-lg'>
								{data?.payload?.endPrice
									? data?.payload?.endPrice
									: 'No end price'}
							</Text>
						</View>
					</View>

					<View className='flex flex-row items-center mb-4 gap-x-4'>
						<Text className='text-sm font-bold text-neutral-500'>
							Product info
						</Text>
						<Pressable className='px-4 py-2 border rounded-full' onPress={handleViewProduct}>
							<Text>View product info</Text>
						</Pressable>
					</View>

					{/* <View className='flex items-center self-center justify-center w-40 overflow-hidden aspect-square bg-neutral-400/50'>
						{data?.payload?.image_url ? (
							<Image
								className='w-full h-full'
								source={{ uri: data?.payload?.image_url }}
								resizeMode='cover'
							/>
						) : (
							<Text className='text-lg font-semibold text-neutral-500'>
								No Image
							</Text>
						)}
					</View>
					<View className='flex flex-row items-center w-full '>
						<View className='flex flex-row items-center flex-1'>
							<Text className='font-medium'>Product Name: </Text>
							<Text className='text-lg'>
								{data?.payload?.title}
							</Text>
						</View>
						<View className='flex flex-row items-center flex-1'>
							<Text className='font-medium'>Quantity: </Text>
							<Text className='text-lg'>
								{data?.payload?.quantity}
							</Text>
						</View>
					</View>

					<View className='flex flex-row items-center w-full '>
						<View className='flex flex-row items-center flex-1'>
							<Text className='font-medium'>Created At: </Text>
							<Text className='text-lg'>
								{data?.payload?.startDate
									? displayDateOfBirth(
											data?.payload?.created_at
									  )
									: ''}
							</Text>
						</View>
						<View className='flex flex-row items-center flex-1'>
							<Text className='font-medium'>Updated At: </Text>
							<Text className='text-lg'>
								{data?.payload?.endDate
									? displayDateOfBirth(
											data?.payload?.updated_at
									  )
									: ''}
							</Text>
						</View>
					</View> */}
					{
						data?.payload?.status === 'WAITING' &&
						<View className='flex '>
						<Button
						onPress={handleConfirmApprove}
						title='Approve auction'
						color={'green'}
						></Button>
					</View>
					}
					<View className='flex '>
						<Button
							onPress={handleConfirmDelete}
							title='Delete Auction'
							color={'red'}
						></Button>
					</View>
				</ScrollView>
			)}
		</View>
	);
};

export default AuctionDetails;
