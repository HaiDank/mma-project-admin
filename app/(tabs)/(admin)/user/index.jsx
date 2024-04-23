import { View, Text, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDeleteUser, useUserData } from '../../../../hooks/use-user-data';
import { Checkbox, DataTable } from 'react-native-paper';
import RoundedButton from '../../../../components/RoundedButton';
import { useQueryClient } from '@tanstack/react-query';
import { displayDateOfBirth } from '../../../../utils/time';
import { AntDesign } from '@expo/vector-icons';
import Layout from '../../../../components/Layout';
import { router } from 'expo-router';

const UserDataScreen = () => {
	const [page, setPage] = useState(0);

	const [numberOfItemsPerPageList] = useState([2, 4, 6]);
	const [itemsPerPage, onItemsPerPageChange] = useState(
		numberOfItemsPerPageList[0]
	);

	const [selectedList, setSelectedList] = useState([]);
	const [selectedAll, setSelectedAll] = useState(false);
	const { data, error, status } = useUserData(page + 1, itemsPerPage);

	const { mutate: deleteUser } = useDeleteUser();

	const queryClient = useQueryClient();

	const from = page * itemsPerPage;
	const to = Math.min(
		(page + 1) * itemsPerPage,
		data?.totalElements ? data?.totalElements : 0
	);

	const handleChecked = (id) => {
		const updatedList = [...selectedList];
		const index = updatedList.findIndex((item) => item === id);
		if (index > -1) {
			updatedList.splice(index, 1);
		} else {
			updatedList.push(id);
		}
		setSelectedList(updatedList);
		console.log(updatedList);
	};

	const handleDelete = () => {
		console.log(selectedList);
		if (selectedAll) {
			data?.content.forEach((item) => {
				deleteUser(id);
			});
		} else if (selectedList?.length > 0) {
			selectedList.forEach((item) => deleteUser(item));
		}
		setSelectedAll(false)
		setSelectedList([])
	};

	const handleConfirmDelete = () => {
		console.log(selectedList);
		if (selectedAll || selectedList?.length > 0) {
			Alert.alert(
				'',
				'Are you sure you want to delete the selected items?',
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
		} else {
			Alert.alert(
				'',
				'There is no selected item',
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
		}
	};

	useEffect(() => {
		setPage(0);
	}, [itemsPerPage]);

	// useEffect(() => {
	// 	console.log(' get', data);
	// }, [data]);

	return (
		<Layout>
			<View className='flex flex-row items-center my-4 gap-x-4'>
				<View className='flex items-center '>
					<RoundedButton
						size='lg'
						onPress={() => {
							router.push('user/create-user');
						}}
					>
						<AntDesign name='plus' size={32} color='black' />
					</RoundedButton>
					<Text className='font-medium'>Create user</Text>
				</View>
				<View className='flex items-center '>
					<RoundedButton
						size='lg'
						onPress={() => {
							handleConfirmDelete();
						}}
					>
						<AntDesign name='delete' size={32} color='black' />
					</RoundedButton>
					<Text className='font-medium'>Delete selected</Text>
				</View>
			</View>

			<DataTable style={{ backgroundColor: '#fff', borderRadius: 24 }}>
				<DataTable.Header>
					<View className='flex flex-row items-center justify-start '>
						<Checkbox
							status={selectedAll ? 'checked' : 'unchecked'}
							onPress={() => {
								setSelectedAll((prev) => !prev);
							}}
						/>
					</View>
					<View className='flex flex-row items-center justify-start w-6 '>
						<Text className='text-neutral-600'>ID</Text>
					</View>
					{/* <DataTable.Title >ID</DataTable.Title> */}
					<DataTable.Title>Email</DataTable.Title>
					<DataTable.Title>Name</DataTable.Title>
					<DataTable.Title>Gender</DataTable.Title>
					<DataTable.Title>Date of Birth</DataTable.Title>
				</DataTable.Header>

				{data?.content &&
					data.content.map((item) => (
						<DataTable.Row
							key={item.id}
							onPress={() => {
								router.push(`user/${item.id}`);
							}}
						>
							{/* <DataTable.Cell >{item.id}</DataTable.Cell> */}
							<View className='flex flex-row items-center justify-start '>
								<Checkbox
									status={
										selectedList.indexOf(item.id) > -1 ||
										selectedAll
											? 'checked'
											: 'unchecked'
									}
									onPress={() => handleChecked(item.id)}
								/>
							</View>
							<View className='flex flex-row items-center justify-start w-6'>
								<Text>{item.id}</Text>
							</View>
							<DataTable.Cell>{item.email}</DataTable.Cell>
							<DataTable.Cell>{item.name}</DataTable.Cell>
							<DataTable.Cell>{item.gender}</DataTable.Cell>
							<DataTable.Cell>
								{item.dob ? displayDateOfBirth(item.dob) : ''}
							</DataTable.Cell>
						</DataTable.Row>
					))}

				{status === 'pending' && (
					<ActivityIndicator animating={true} className='w-full' />
				)}

				<DataTable.Pagination
					page={page}
					numberOfPages={Math.ceil(
						data?.totalElements / itemsPerPage
					)}
					onPageChange={(page) => setPage(page)}
					label={`${from + 1}-${to} of ${
						data?.totalElements ? data?.totalElements : 0
					}`}
					numberOfItemsPerPageList={numberOfItemsPerPageList}
					numberOfItemsPerPage={itemsPerPage}
					onItemsPerPageChange={onItemsPerPageChange}
					showFastPaginationControls
					selectPageDropdownLabel={'Rows per page'}
				/>
				<View className='absolute flex flex-row items-center left-4 bottom-4'>
					<RoundedButton
						size='sm'
						onPress={() =>
							queryClient.invalidateQueries({
								queryKey: ['users'],
							})
						}
					>
						<AntDesign name='reload1' size={16} color='black' />
					</RoundedButton>
				</View>
			</DataTable>
		</Layout>
	);
};

export default UserDataScreen;
