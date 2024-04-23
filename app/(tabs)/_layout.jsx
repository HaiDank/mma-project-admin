import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';


const TabIcon = ({ icon, color, name, focused }) => {
	return (
		<View className='flex items-center justify-center duration-500 transition-color'>
			{icon}
			<Text
				className={`${
					focused ? 'font-semibold text-green-700' : 'font-normal text-neutral-500'
				} text-xs duration-500 transition-color`}
			>
				{name}
			</Text>
		</View>
	);
};

const TabsLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarHideOnKeyboard: true,
					tabBarActiveTintColor: '#000',
					tabBarInactiveTintColor: '#888',
					tabBarShowLabel: false,
					tabBarStyle: {
						backgroundColor: '#efefef',
						height: 70,
						shadowOpacity: 0,
						borderTopWidth:0,
						elevation: 0
					},
					headerShown: false,
					tabBarBackground: ()=>{
						<BlurView className='bg-black/5'></BlurView>
					}
				}}
				initialRouteName='(admin)/home'
			>
				<Tabs.Screen
					name='(admin)/home'
					options={{
						title: 'Home',
						href: null,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={
									<AntDesign
										name='home'
										size={24}
										color={color}
									/>
								}
								color={color}
								name='Home'
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='(admin)/user'
					options={{
						title: 'User',
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={
									<AntDesign
										name='user'
										size={24}
										color={color}
									/>
								}
								color={color}
								name='User'
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='(admin)/product'
					options={{
						title: 'Product',
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={
									<Feather
										name='inbox'
										size={24}
										color={color}
									/>
								}
								color={color}
								name='Product'
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='(admin)/transaction'
					options={{
						title: 'Transaction',
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={
									<MaterialIcons
										name='attach-money'
										size={24}
										color={color}
									/>
								}
								color={color}
								name='Transaction'
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='(admin)/auction'
					options={{
						title: 'Auction',
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={<FontAwesome5 name="comments-dollar" size={24} color={color} />}
								color={color}
								name='Auction'
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='(admin)/order/index'
					options={{
						title: 'Order',
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={<Feather name="clipboard" size={24} color={color} />}
								color={color}
								name='Order'
								focused={focused}
							/>
						),
					}}
				/>
			</Tabs>
			{/* <Loader isLoading={loading} /> */}
			<StatusBar backgroundColor='#161622' style='light' />
		</>
	);
};

export default TabsLayout;
