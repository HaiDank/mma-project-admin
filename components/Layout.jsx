import { View, Text } from 'react-native'
import React from 'react'
import TabHeader from './TabHeader'

const Layout = ({children}) => {
  return (
    <View className='flex-1 w-full ralative '>
      <TabHeader />

      <View className='flex-1 w-full p-4 mt-16'>
      {children}
      </View>
    </View>
  )
}

export default Layout