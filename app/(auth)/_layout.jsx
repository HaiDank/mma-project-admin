import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from '@gluestack-ui/themed'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <>
    <Stack screenOptions={{
       headerShadowVisible: false
    }}>
      <Stack.Screen name='sign-in' options={{headerShown: true, title: '',  }}/>
      <Stack.Screen name='sign-up' options={{headerShown: true}}/>
    </Stack>
    </>
  )
}

export default AuthLayout