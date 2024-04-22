import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { useUserData } from '../../../hooks/use-user-data';
import { DataTable } from 'react-native-paper';
import RoundedButton from '../../../components/RoundedButton';
import { useQueryClient } from '@tanstack/react-query';
import { displayDateOfBirth } from '../../../utils/time';

const UserDataScreen = () => {
	const [page, setPage] = useState(0);
	const [numberOfItemsPerPageList] = useState([2, 3, 4]);
	const [itemsPerPage, onItemsPerPageChange] = useState(
		numberOfItemsPerPageList[0]
	);

	const { data, error, status } = useUserData(page, itemsPerPage);
	const queryClient = useQueryClient();

	const from = page * itemsPerPage;
	const to = Math.min(
		(page + 1) * itemsPerPage,
		data?.content?.length ? data?.content?.length : 0
	);

	useEffect(() => {
		setPage(0);
	}, [itemsPerPage]);

	// useEffect(() => {
	// 	console.log(' get', data);
	// }, [data]);

	return (
		<Layout>
			<RoundedButton
				onPress={() => {
					queryClient.invalidateQueries({ queryKey: ['users'] });
				}}
			>
				<Text>asdawd</Text>
			</RoundedButton>

			<DataTable>
				<DataTable.Header>
					<View className='flex flex-row items-center justify-start w-6'>
						<Text>ID</Text>
					</View>
					{/* <DataTable.Title >ID</DataTable.Title> */}
					<DataTable.Title>Email</DataTable.Title>
					<DataTable.Title>Name</DataTable.Title>
					<DataTable.Title>Gender</DataTable.Title>
					<DataTable.Title>Date of Birth</DataTable.Title>
				</DataTable.Header>

				{data?.content &&
					data.content.map((item) => (
						<DataTable.Row key={item.id}>
							{/* <DataTable.Cell >{item.id}</DataTable.Cell> */}
              <View className='flex flex-row items-center justify-start w-6'>
						<Text>{item.id}</Text>
					</View>
							<DataTable.Cell>{item.email}</DataTable.Cell>
							<DataTable.Cell>{item.name}</DataTable.Cell>
							<DataTable.Cell>{item.gender}</DataTable.Cell>
							<DataTable.Cell>{item.dob ? displayDateOfBirth(item.dob) : ''}</DataTable.Cell>
						</DataTable.Row>
					))}

				<DataTable.Pagination
					page={page}
					numberOfPages={Math.ceil(
						data?.content?.length / itemsPerPage
					)}
					onPageChange={(page) => setPage(page)}
					label={`${from + 1}-${to} of ${
						data?.content?.length ? data?.content?.length : 0
					}`}
					numberOfItemsPerPageList={numberOfItemsPerPageList}
					numberOfItemsPerPage={itemsPerPage}
					onItemsPerPageChange={onItemsPerPageChange}
					showFastPaginationControls
					selectPageDropdownLabel={'Rows per page'}
				/>
			</DataTable>
		</Layout>
	);
};

export default UserDataScreen;
