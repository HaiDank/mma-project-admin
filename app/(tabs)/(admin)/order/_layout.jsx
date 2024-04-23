import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const OrderLayout = () => {
  return (
    <Stack initialRouteName='index'>
        <Stack.Screen name='index' options={{headerShown: false}}/>
        <Stack.Screen name='[id]' options={{headerShown: true , title: 'Order Details'}}/>
    </Stack>
  )
}

export default OrderLayout