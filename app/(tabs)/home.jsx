import { View, Text, ScrollView, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';

const Home = () => {

	const handleScroll = () => {

	}

	return (
		<FlatList className='flex-1 h-full' contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}} onScroll={handleScroll}>
			<FontAwesome name='home' size={100} color='black' />
			<Text>Home</Text>
			<View className='h-[2000px]'></View>
		</FlatList>
	);
};

export default Home;
