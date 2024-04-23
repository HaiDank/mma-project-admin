import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { productData } from "../../../hooks/product-data";
import { DataTable } from "react-native-paper";
import RoundedButton from "../../../components/RoundedButton";
import { useQueryClient } from "@tanstack/react-query";
import { displayDateOfBirth } from "../../../utils/time";

const Product = () => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([1, 2, 3]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const { data, error, status } = productData(page, itemsPerPage);
  const queryClient = useQueryClient();

  const from = page * itemsPerPage;
  const to = Math.min(
    (page + 1) * itemsPerPage,
    data?.content?.length ? data?.content?.length : 0
  );

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  useEffect(() => {
    console.log(data);
  }, [data])
  return (
    <Layout>
      <DataTable>
        <DataTable.Header>
          <View className="flex flex-row items-center justify-start w-6">
            <Text>ID</Text>
          </View>
          {/* <DataTable.Title >ID</DataTable.Title> */}
          <DataTable.Title>Productname</DataTable.Title>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
        </DataTable.Header>

        {data?.content &&
          data.content.map((item) => (
            <DataTable.Row key={item.id}>
              {/* <DataTable.Cell >{item.id}</DataTable.Cell> */}
              <View className="flex flex-row items-center justify-start w-6">
                <Text>{item.id}</Text>
              </View>
              <DataTable.Cell>{item.productName}</DataTable.Cell>
              <DataTable.Cell>{item.categoryId}</DataTable.Cell>
              <DataTable.Cell>{item.active}</DataTable.Cell>

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
      </DataTable>
    </Layout>
  );
};

export default Product;
