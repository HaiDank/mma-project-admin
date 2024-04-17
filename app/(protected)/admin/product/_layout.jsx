import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const AdminProductView = () => {
	return (
		<View>
			<Text>AdminProductView</Text>
			<Stack>
				<Stack.Screen
					name='view'
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='create'
					options={{
						presentation: 'modal',
					}}
				/>
			</Stack>
		</View>
	);
};

export default AdminProductView;
