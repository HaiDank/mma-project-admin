import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuctionLayout = () => {
  return (
    <Stack initialRouteName='index'>
        <Stack.Screen name='index' options={{headerShown: false}}/>
        <Stack.Screen name='[id]' options={{headerShown: true , title: 'Auction Details'}}/>
        <Stack.Screen name='create-auction' options={{headerShown: true , title: 'Create Auction'}}/>
    </Stack>
  )
}

export default AuctionLayout