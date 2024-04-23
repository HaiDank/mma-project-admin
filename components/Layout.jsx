import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import TabHeader from './TabHeader'

const Layout = ({children}) => {
  return (
    <View className='flex-1 w-full ralative '>
      <TabHeader />

      <ScrollView className='flex-1 w-full p-4 mt-16 '>
      {children}
      </ScrollView>
    </View>
  )
}

export default Layout