import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Layout from '../../../../components/Layout'
import { Checkbox, DataTable } from 'react-native-paper'

const Aunction = () => {

  const [page, setPage] = useState(0);

	const [numberOfItemsPerPageList] = useState([2, 4, 6]);
	const [itemsPerPage, onItemsPerPageChange] = useState(
		numberOfItemsPerPageList[0]
	);

	const [selectedList, setSelectedList] = useState([]);
	const [selectedAll, setSelectedAll] = useState(false);
	const { data, error, status } = useAuctionData(page + 1, itemsPerPage);

  return (
    <Layout>

      <Text>Aunction</Text>

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
  )
}

export default Aunction