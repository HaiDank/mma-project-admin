import { View, Text, ActivityIndicator, Image, Button, Alert } from 'react-native';
import React from 'react';
import Layout from '../../../../components/Layout';
import { router, useLocalSearchParams } from 'expo-router';
import { useDeleteUser, useOneUserData } from '../../../../hooks/use-user-data';
import Loader from '../../../../components/Loader';
import { displayDateOfBirth } from '../../../../utils/time';

const UserDetails = () => {
	const { id } = useLocalSearchParams();
	const { mutate: deleteUser } = useDeleteUser();

	const { data, error, status } = useOneUserData(id);

	const handleConfirmDelete = () => {
		Alert.alert(
			'',
			'Are you sure you want to delete this user?',
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
		deleteUser({id});
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
								source={{ uri: data?.payload.img }}
								resizeMode='cover'
							/>
						) : (
							<Text className='text-lg font-semibold text-neutral-500'>
								No Image
							</Text>
						)}
					</View>

					<View className='flex flex-row items-center'>
						<Text className='font-medium'>Name: </Text>
						<Text className='text-lg'>{data?.payload.name}</Text>
					</View>
					<View className='flex flex-row items-center'>
						<Text className='font-medium'>Email: </Text>
						<Text className='text-lg'>{data?.payload.email}</Text>
					</View>
					<View className='flex flex-row items-center w-full gap-x-10'>
						<View className='flex flex-row items-center'>
							<Text className='font-medium'>Date of Brith: </Text>
							<Text className='text-lg'>
								{displayDateOfBirth(data?.payload.dob)}
							</Text>
						</View>
						<View className='flex flex-row items-center'>
							<Text className='font-medium'>Gender: </Text>
							<Text className='text-lg'>
								{data?.payload.gender}
							</Text>
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
						<View className='flex flex-row items-center'>
							<Text className='font-medium'>Role: </Text>
							<Text className='text-lg'>
								{data?.payload.role}
							</Text>
						</View>
					</View>
					<View className='flex '>
						<Button
							title='Delete user'
							color={'red'}
							onPress={handleConfirmDelete}
						></Button>
					</View>
				</View>
			)}
		</View>
	);
};

export default UserDetails;
