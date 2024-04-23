import React, { useEffect } from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Stack, useRouter, useSegments } from 'expo-router';
import GlobalProvider, { useGlobalContext } from '../context/GlobalProvider';
import AuthProvider, { useAuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native';
import { Loader } from '../components';
import { PaperProvider } from 'react-native-paper';

const queryClient = new QueryClient();

const StackLayout = () => {
	const { authState } = useAuthContext();
	const {loading} = useGlobalContext()
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		console.log(' auth ', authState.token)
		const isInAuthorizedScreen = segments[0] === '(tabs)';

		if (!authState?.authenticated && isInAuthorizedScreen) {
			router.replace('/sign-in');
		} else if (authState?.authenticated) {
			if (authState.role === 'ADMIN') {
				router.replace('(admin)/home');
			}
		}
	}, [authState]);

	useEffect(() => {
		const isInAuthorizedScreen = segments[0] === '(tabs)';
		if (!authState?.authenticated && isInAuthorizedScreen) {
			router.replace({
				pathname: "/sign-in",
				params: { error: 'Please log in to access the app!' }
			  });
		}
	}, [segments]);

	return (
		<SafeAreaView className='flex-1 '>
			<Loader loading={loading} />
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
			<PaperProvider>
				<GlobalProvider>
					<AuthProvider>
						<GluestackUIProvider>
							<StackLayout />
						</GluestackUIProvider>
					</AuthProvider>
				</GlobalProvider>
			</PaperProvider>
		</QueryClientProvider>
	);
};

export default RootLayout;
