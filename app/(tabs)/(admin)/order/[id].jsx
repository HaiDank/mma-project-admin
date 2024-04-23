import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useOneOrderData } from '../../../../hooks/use-order-data';
import Loader from '../../../../components/Loader';
import { useLocalSearchParams } from 'expo-router';
import { displayDateOfBirth } from '../../../../utils/time';

const OrderDetails = () => {

  const { id } = useLocalSearchParams();

  const { data, error, status } = useOneOrderData(id);


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
						<Text className='font-medium'>Auction Id: </Text>
						<Text className='text-lg'>
							{data?.payload?.auctionID}
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
							<Text className='font-medium'>Created At: </Text>
							<Text className='text-lg'>
								{data?.payload?.created_at
									? displayDateOfBirth(
											data?.payload?.created_at
									  )
									: ''}
							</Text>
						</View>
						<View className='flex flex-row items-center flex-1'>
							<Text className='font-medium'>Expired At: </Text>
							<Text className='text-lg'>
								{data?.payload?.expiredAt
									? displayDateOfBirth(data?.payload?.expiredAt)
									: ''}
							</Text>
						</View>
					</View>

					<View className='flex flex-row items-center w-full '>
						<View className='flex flex-row items-center '>
							<Text className='font-medium'>Updated At: </Text>
							<Text className='text-lg'>
								{data?.payload?.updated_at
									? displayDateOfBirth(
											data?.payload?.updated_at
									  )
									: ''}
							</Text>
						</View>
					</View>

					<View className='flex'>
						<Text className='text-sm font-bold text-neutral-500'>
							Payment Info
						</Text>
					</View>

					<View className='flex flex-row items-center w-full '>
						<View className='flex flex-row items-center flex-1'>
							<Text className='font-medium'>Total price: </Text>
							<Text className='text-lg'>
								{data?.payload?.total}
							</Text>
						</View>
					
					</View>
          <View className='flex flex-row items-center w-60'>
						<View className='flex flex-row items-center '>
							<Text className='font-medium'>Address: </Text>
							<Text className='break-words'>
								{data?.payload?.address}
							</Text>
						</View>
					
					</View>
          

          <View className='flex flex-row items-center w-full '>
						<View className='flex flex-row items-center flex-1'>
							<Text className='font-medium'>Payment method: </Text>
							<Text className='text-lg'>
								{data?.payload?.paymentMethod}
							</Text>
						</View>
						
					</View>
					
          <View className='flex flex-row items-center flex-1'>
							<Text className='font-medium'>Phone number: </Text>
							<Text className='text-lg'>
								{data?.payload?.phone}
							</Text>
						</View>
					<View className='flex'>
						<Text className='text-sm font-bold text-neutral-500'>
							Product info
						</Text>
					</View>

          <View className='flex flex-row items-center w-full '>
						<View className='flex flex-row items-center flex-1'>
							<Text className='font-medium'>Product Code: </Text>
							<Text className='text-lg'>
								{data?.payload?.productCode}
							</Text>
						</View>
						
					</View>

					
					
				</ScrollView>
			)}
		</View>
	);
}

export default OrderDetails