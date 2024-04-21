import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

const TabIcon = ({ icon, color, name, focused }) => {
	return (
		<View className='flex items-center justify-center duration-500 transition-color'>
			<Feather name={icon} size={24} color={color} />
			<Text
				className={`${
					focused ? 'font-semibold' : 'font-normal'
				} text-xs duration-500 transition-color`}
				style={{ color: color }}
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
					tabBarActiveTintColor: '#000',
					tabBarInactiveTintColor: '#888',
					tabBarShowLabel: false,
					tabBarStyle: {
						backgroundColor: '#efefef',
						height: 60,
						shadowOpacity: 0,
					},
					headerShown: true,
				}}
			>
				<Tabs.Screen
					name='home'
					options={{
						title: 'Home',
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon='home'
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
								icon='home'
								color={color}
								name='User'
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
