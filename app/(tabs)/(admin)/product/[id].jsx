import { View, Text, ScrollView, Button } from 'react-native';
import React, { useEffect } from 'react';
import { useDeleteProduct, useOneProductData } from '../../../../hooks/product-data';
import { useLocalSearchParams } from 'expo-router';
import Loader from '../../../../components/Loader';

const ProductDetails = () => {

    const {id} = useLocalSearchParams()

    const {data, error, status} = useOneProductData(id)
    const {mutate: deleteProduct} = useDeleteProduct()


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
		deleteProduct({id});
		router.back();
	};

    useEffect(()=>{
        console.log(data)
    },[data])

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

					<View className='flex'>
						<Text className='text-sm font-bold text-neutral-500'>
							Product info
						</Text>
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
					
					<View className='flex '>
						<Button
							onPress={handleConfirmDelete}
							title='Delete User'
							color={'red'}
						></Button>
					</View>
				</ScrollView>
			)}
		</View>
	);
};

export default ProductDetails;
