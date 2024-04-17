import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useAuthContext } from '../../context/AuthContext'

const ProtectedLayout = () => {

  const { authState} = useAuthContext()



  return (
    <>
        <Stack>
          <Stack.Screen 
            name='admin'
            options={{headerShown: false}}
            redirect={!authState?.authenticated || authState.role !== 'admin'}
          />
          <Stack.Screen 
            name='staff'
            options={{headerShown: false}}
            redirect={!authState?.authenticated || authState.role !== 'staff'}
          />
        </Stack>
    </>
  )
}

export default ProtectedLayout