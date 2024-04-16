import React from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';
import GlobalProvider from '../context/GlobalProvider';

const RootLayout = () => {
	return (
		<GlobalProvider>
			<GluestackUIProvider>
				<Stack>
					<Stack.Screen
						name='(tabs)'
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='(auth)'
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='index'
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='search/[query]'
						options={{ headerShown: false }}
					/>
				</Stack>
			</GluestackUIProvider>
		</GlobalProvider>
	);
};

export default RootLayout;
