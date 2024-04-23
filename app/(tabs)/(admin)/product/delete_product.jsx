import { View, Text, ActivityIndicator, Image, Button, Alert } from 'react-native';
import React from 'react';
import Layout from '../../../../components/Layout';
import { router, useLocalSearchParams } from 'expo-router';
import { useDeleteProduct, useOneProductData } from '../../../../hooks/product-data';
import Loader from '../../../../components/Loader';
import { displayDateOfBirth } from '../../../../utils/time';

const DeleteDetails = () => {
	const { id } = useLocalSearchParams();
	const { mutate: deleteProduct } = useDeleteProduct();

	const { data, error, status } = useOneProductData(id);

	console.log(data);

	const handleConfirmDelete = () => {
		Alert.alert(
			'',
			'Are you sure you want to delete this product?',
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
		deleteProduct(id);
		router.back();
	};

	return (
		<View className='flex-1 w-full h-full'>
			{status === 'pending' ? (
				<Loader loading={status === 'pending'} />
			) : (
				<View className='flex-1 p-4 gap-y-2'>
					<View className='flex flex-row items-center'>
						<Text className='font-medium'>ID: </Text>
						<Text className='text-lg'>{data?.payload.id}</Text>
					</View>
					<View className='flex items-center self-center justify-center w-40 overflow-hidden aspect-square bg-neutral-400/50'>
						{data?.payload.img ? (
							<Image
								source={{ uri: data?.payload.image }}
								resizeMode='cover'
							/>
						) : (
							<Text className='text-lg font-semibold text-neutral-500'>
								No Image
							</Text>
						)}
					</View>

					<View className='flex flex-row items-center'>
						<Text className='font-medium'>ProductName: </Text>
						<Text className='text-lg'>{data?.payload.productName}</Text>
					</View>
					<View className='flex flex-row items-center'>
						<Text className='font-medium'>Quantity </Text>
						<Text className='text-lg'>{data?.payload.quantity}</Text>
					</View>
					<View className='flex flex-row items-center w-full gap-x-10'>
						<View className='flex flex-row items-center'>
							<Text className='font-medium'>Description </Text>
							<Text className='text-lg'>{data?.payload.descrition}</Text>
						</View>
					</View>

					<View className='flex flex-row items-center w-full gap-x-9'>
						<View className='flex flex-row items-center'>
							<Text className='font-medium'>Ban status: </Text>
							{data?.payload.banned ? (
								<Text className='text-lg text-red-600'>
									BANNED
								</Text>
							) : (
								<Text className='text-lg text-green-600'>
									NOT BANNED
								</Text>
							)}
						</View>
					</View>
					<View className='flex '>
						<Button
							title='Delete product'
							color={'red'}
							onPress={handleConfirmDelete}
						></Button>
					</View>
				</View>
			)}
		</View>
	);
};

export default DeleteDetails;
