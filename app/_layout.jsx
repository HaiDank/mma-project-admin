import React, { useEffect } from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Stack, useRouter, useSegments } from 'expo-router';
import GlobalProvider from '../context/GlobalProvider';
import AuthProvider, { useAuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const StackLayout = () => {
	const { authState } = useAuthContext();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		console.log('asdawd ', authState);
		const isInAuthorizedScreen =
			segments[0] === 'admin' || segments[0] === 'staff';

		if (!authState?.authenticated && isInAuthorizedScreen) {
			router.replace('/sign-in');
		} else if (authState?.authenticated) {
			if (authState.role === 'admin') {
				router.replace('/admin');
			}
		}
	}, [authState]);

	return (
		<SafeAreaView className='flex-1 '>
			<Stack>
				<Stack.Screen
					name='(protected)'
					options={{ headerShown: false }}
				/>

				<Stack.Screen name='(auth)' options={{ headerShown: false }} />
				<Stack.Screen name='index' options={{ headerShown: false }} />
			</Stack>
		</SafeAreaView>
	);
};

const RootLayout = () => {
	return (
		<GlobalProvider>
			<AuthProvider>
				<GluestackUIProvider>
					<StackLayout />
				</GluestackUIProvider>
			</AuthProvider>
		</GlobalProvider>
	);
};

export default RootLayout;
