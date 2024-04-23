import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const UserLayout = () => {
  return (
    <Stack initialRouteName='index'>
        <Stack.Screen name='index' options={{headerShown:false}}/>
        <Stack.Screen name='[id]' options={{headerShown:true, headerTitle: 'User Detail'}}/>
        <Stack.Screen name='create-user' options={{headerShown:true, headerTitle: 'Create User'}}/>
    </Stack>
  )
}

export default UserLayout