import React, { useEffect } from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Stack, useRouter, useSegments } from 'expo-router';
import GlobalProvider from '../context/GlobalProvider';
import AuthProvider, { useAuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native';
import { Loader } from '../components';

const queryClient = new QueryClient();

const StackLayout = () => {
	const { authState } = useAuthContext();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		const isInAuthorizedScreen = segments[0] === '(tabs)';

		if (!authState?.authenticated && isInAuthorizedScreen) {
			router.push('/sign-in');
		} else if (authState?.authenticated) {
			if (authState.role === 'ADMIN') {
				router.replace('(admin)/home');
			}
		}
	}, [authState]);

	useEffect(() => {
		const isInAuthorizedScreen = segments[0] === '(tabs)';
		if (!authState?.authenticated && isInAuthorizedScreen) {
			router.replace('/sign-in');
		}
	}, [segments]);

	return (
		<SafeAreaView className='flex-1 '>
			<Loader />
			<Stack>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				<Stack.Screen name='(auth)' options={{ headerShown: false }} />
				<Stack.Screen name='index' options={{ headerShown: false }} />
			</Stack>
		</SafeAreaView>
	);
};

const RootLayout = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalProvider>
				<AuthProvider>
					<GluestackUIProvider>
						<StackLayout />
					</GluestackUIProvider>
				</AuthProvider>
			</GlobalProvider>
		</QueryClientProvider>
	);
};

export default RootLayout;
