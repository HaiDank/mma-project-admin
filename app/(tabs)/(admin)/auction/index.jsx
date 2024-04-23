import { View, Text, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import Layout from '../../../../components/Layout';
import { Checkbox, DataTable } from 'react-native-paper';
import {
	useApproveAuction,
	useAuctionData,
	useDeleteAuction,
} from '../../../../hooks/use-auction-data';
import RoundedButton from '../../../../components/RoundedButton';
import { AntDesign } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';

const Aunction = () => {
	const [page, setPage] = useState(0);

	const [numberOfItemsPerPageList] = useState([2, 4, 6]);
	const [itemsPerPage, onItemsPerPageChange] = useState(
		numberOfItemsPerPageList[0]
	);
	const queryClient = useQueryClient();
	const { data, error, status } = useAuctionData(page + 1, itemsPerPage);
	const { mutate: deleteAuction } = useDeleteAuction();
	const { mutate: approveAuction } = useApproveAuction();

	const from = page * itemsPerPage;
	const to = Math.min(
		(page + 1) * itemsPerPage,
		data?.totalElements ? data?.totalElements : 0
	);

	const [selectedList, setSelectedList] = useState([]);
	const [selectedAll, setSelectedAll] = useState(false);

	const handleConfirmDelete = () => {
		if (selectedAll || selectedList?.length > 0) {
			Alert.alert(
				'',
				'Are you sure you want to delete the selected auction?',
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

	const handleDelete = () => {
		if (selectedAll) {
			data?.content.forEach((item) => {
				const id = item.id.toString();
				deleteAuction({ id });
			});
		} else if (selectedList?.length > 0) {
			selectedList.forEach((item) => {
				const id = item.id.toString();
				deleteAuction({ id });
			});
		}
		setSelectedAll(false);
		setSelectedList([]);
	};

	const handleChecked = (id) => {
		const updatedList = [...selectedList];
		const index = updatedList.findIndex((item) => item === id);
		if (index > -1) {
			updatedList.splice(index, 1);
		} else {
			updatedList.push(id);
		}
		setSelectedList(updatedList);
	};

	const handleApprove = () => {
		if (selectedAll) {
			data?.content.forEach((item) => {
				const auction = item;
				approveAuction({ auction });
			});
		} else if (selectedList?.length > 0) {
			selectedList.forEach((item) => {
				if(item.status === "END"){
					console.log('ended cannot edit')
					return
				}
				const auction = {...item, ['approved'] : true}
				approveAuction({auction});
			});
		}
		setSelectedAll(false);
		setSelectedList([]);
	};

	return (
		<Layout>
			<Text className='w-full my-2 text-3xl font-semibold text-center'>
      Auction
      </Text>
			<View className='flex flex-row items-center my-4 gap-x-4'>
				<View className='flex items-center '>
					<RoundedButton
						size='lg'
						onPress={() => {
							router.push('auction/create-auction');
						}}
					>
						<AntDesign name='plus' size={32} color='black' />
					</RoundedButton>
					<Text className='font-medium'>Create auction</Text>
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
				<View className='flex items-center '>
					<RoundedButton
						size='lg'
						onPress={() => {
							handleApprove();
						}}
					>
						<AntDesign name='check' size={32} color='black' />
					</RoundedButton>
					<Text className='font-medium'>Approve selected</Text>
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
					<DataTable.Title>Title</DataTable.Title>
					<DataTable.Title>Product Name</DataTable.Title>
					<DataTable.Title>Approved</DataTable.Title>
					<DataTable.Title>Status</DataTable.Title>
				</DataTable.Header>

				{data?.content &&
					data.content.map((item) => (
						<DataTable.Row
							key={item.id}
							onPress={() => {
								router.push(`auction/${item.id}`);
							}}
						>
							{/* <DataTable.Cell >{item.id}</DataTable.Cell> */}
							<View className='flex flex-row items-center justify-start '>
								<Checkbox
									status={
										selectedList.indexOf(item) > -1 ||
										selectedAll
											? 'checked'
											: 'unchecked'
									}
									onPress={() => handleChecked(item)}
								/>
							</View>
							<View className='flex flex-row items-center justify-start w-6'>
								<Text>{item.id}</Text>
							</View>
							<DataTable.Cell>{item.title}</DataTable.Cell>
							<DataTable.Cell>{item.productName}</DataTable.Cell>
							<DataTable.Cell>
								{item.approved ? 'Approved' : 'Not'}
							</DataTable.Cell>
							<DataTable.Cell>{item.status}</DataTable.Cell>
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
								queryKey: ['auctions'],
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

export default Aunction;
