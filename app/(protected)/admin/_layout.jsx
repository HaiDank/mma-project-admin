import { View, Text } from 'react-native';
import React from 'react';

const AdminLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen
					name='index'
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='product'
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
		</>
	);
};

export default AdminLayout;
