import { View, Text, ScrollView, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { RoundedButton } from '../../../components';
import { AntDesign } from '@expo/vector-icons';
import Layout from '../../../components/Layout';
const Home = () => {
	const handleScroll = () => {};

	return (
		<Layout>
			<View className='flex items-center justify-center h-[70vh] '>
				<Text className='text-3xl font-semibold'>Welcome Admin!</Text>
				<Text className='text-lg'>
					Press any of the bottom tab to begin your work
				</Text>
			</View>
		</Layout>
	);
};

export default Home;
