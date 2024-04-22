import { View, Text, ScrollView, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { RoundedButton } from '../../../components';
import { AntDesign } from '@expo/vector-icons';
const Home = () => {
	const handleScroll = () => {};

	return (
		<View className='flex-1 h-full p-4'>
			<FontAwesome name='home' size={100} color='black' />
			<Text>Home</Text>
			<RoundedButton>
				<AntDesign name='plus' size={32} color='black' />
			</RoundedButton>
			<View className='h-[2000px]'></View>
		</View>
	);
};

export default Home;
