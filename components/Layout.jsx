import { View, Text } from 'react-native'
import React from 'react'
import TabHeader from './TabHeader'

const Layout = ({children}) => {
  return (
    <View className='ralative flex-1 w-full '>
      <Text>Layout</Text>
      <TabHeader />
      {children}
    </View>
  )
}

export default Layout