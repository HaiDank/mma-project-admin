import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuctionLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{headerShown: false}}/>
        <Stack.Screen name='[id]' options={{headerShown: true}}/>
    </Stack>
  )
}

export default AuctionLayout