import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ProductLayout = () => {
  return (
    <Stack initialRouteName='index'>
        <Stack.Screen name='index' options={{headerShown:false}}/>
        <Stack.Screen name='delete_product' options={{headerShown:true, headerTitle: 'Product Detail', headerShadowVisible: false}}/>
        <Stack.Screen name='create_product' options={{headerShown:true, headerTitle: 'Create Product', headerShadowVisible: false}}/>
    </Stack>
  )
}

export default ProductLayout