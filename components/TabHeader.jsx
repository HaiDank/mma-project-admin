import { View, Text } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import RoundedButton from './RoundedButton';
import { router } from 'expo-router';

const TabHeader = () => {
	return (
		<>
			<View>
				<Text>TabHeader</Text>
			</View>
			<View className='flex items-center justify-center absolute z-10 bottom-4 right-4'>
				<RoundedButton onPress={()=>{router.push('(admin)/home')}}>
					<Feather name='home' size={32} color='black' />
				</RoundedButton>
			</View>
		</>
	);
};

export default TabHeader;
