import { Text } from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import { View } from 'react-native';
import { useAuthContext } from '../context/AuthContext';

export default function App() {
	const { authState } = useAuthContext();

	const redirectRoute = authState?.authenticated
		? authState.role === 'admin'
			? '(admin)'
			: '(staff)'
		: 'sign-in';

	return (
		<View className='items-center justify-center flex-1'>
			<Text>Welcome</Text>
				<Link href={redirectRoute} className='text-blue-600 underline'>
					Head to app
				</Link>
			
		</View>
	);
}
