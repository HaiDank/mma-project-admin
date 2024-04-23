import { View, Text, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import { transactionData } from '../../../hooks/transaction-data';
import { DataTable , Checkbox } from 'react-native-paper';
import { useQueryClient } from '@tanstack/react-query';
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import RoundedButton from "../../../components/RoundedButton";

const Transaction = () => {
  const [page, setPage] = useState(0);

  const [numberOfItemsPerPageList] = useState([1, 2, 3]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const [selectedList, setSelectedList] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const { data, error, status } = transactionData(page + 1, itemsPerPage);

  // const { mutate: deleteProduct } = useDeleteProduct();

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
        deleteProduct(id);
      });
    } else if (selectedList?.length > 0) {
      selectedList.forEach((item) => deleteProduct(item));
    }
    setSelectedAll(false);
    setSelectedList([]);
  };

  const handleConfirmDelete = () => {
    console.log(selectedList);
    if (selectedAll || selectedList?.length > 0) {
      Alert.alert(
        "",
        "Are you sure you want to delete the selected items?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Confirm", onPress: () => handleDelete() },
        ],
        {
          cancelable: true,
        }
      );
    } else {
      Alert.alert(
        "",
        "There is no selected item",
        [
          {
            text: "Ok",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
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
  return (
    <Layout>
      <DataTable style={{ backgroundColor: "#fff", borderRadius: 24 }}>
        <DataTable.Header>
          <View className="flex flex-row items-center justify-start ">
            <Checkbox
              status={selectedAll ? "checked" : "unchecked"}
              onPress={() => {
                setSelectedAll((prev) => !prev);
              }}
            />
          </View>
          <View className="flex flex-row items-center justify-start w-6">
            <Text className="text-neutral-600">ID</Text>
          </View>
          {/* <DataTable.Title >ID</DataTable.Title> */}
          <DataTable.Title>TransactionCode</DataTable.Title>
          <DataTable.Title>Payment Method</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
        </DataTable.Header>

        {data?.content &&
          data.content.map((item) => (
            <DataTable.Row
              key={item.id}
              onPress={() => {
                router.push(`transaction/${item.id}`);
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
              <View className="flex flex-row items-center justify-start w-6">
                <Text>{item.id}</Text>
              </View>
              <DataTable.Cell>{item.transactionCode}</DataTable.Cell>
              <DataTable.Cell>{item.paymentMethod}</DataTable.Cell>
              <DataTable.Cell>{item.content}</DataTable.Cell>
            </DataTable.Row>
          ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(data?.content?.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${
            data?.content?.length ? data?.content?.length : 0
          }`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        />
        				<View className='absolute flex flex-row items-center left-4 bottom-4'>
					<RoundedButton
						size='sm'
						onPress={() =>
							queryClient.invalidateQueries({
								queryKey: ['transactions'],
							})
						}
					>
						<AntDesign name='reload1' size={16} color='black' />
					</RoundedButton>
				</View>
      </DataTable>
    </Layout>
  );
}

export default Transaction