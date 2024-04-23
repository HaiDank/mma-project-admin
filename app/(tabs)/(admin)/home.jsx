import { View, Text, ScrollView, FlatList, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { RoundedButton } from '../../../components';

import Layout from '../../../components/Layout';

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

const Home = () => {
	const handleScroll = () => {};

	return (
		<Layout>
			<View className='flex items-center justify-center flex-1 '>
				<Text className='text-3xl font-semibold'>Welcome Admin!</Text>
				<Text className='text-lg'>
					Press any of the bottom tab to begin your work
				</Text>
			</View>
			<View  className='flex-row flex-wrap justify-center flex-1 gap-4 p-4'>
				<Pressable onPress={()=>{router.navigate('user')}} className='flex items-center justify-center h-32 border rounded-lg shadow-lg border-neutral-800 aspect-square'>
					<AntDesign name='user' size={42} color='black' />
					<Text>User</Text>
				</Pressable>
				<Pressable onPress={()=>{router.navigate('product')}} className='flex items-center justify-center h-32 border rounded-lg shadow-lg border-neutral-800 aspect-square'>
					<Feather name='inbox' size={42} color='black' />
					<Text>Product</Text>
				</Pressable>
				<Pressable onPress={()=>{router.navigate('transaction')}} className='flex items-center justify-center h-32 border rounded-lg shadow-lg border-neutral-800 aspect-square'>
					<MaterialIcons
						name='attach-money'
						size={42}
						color='black'
					/>
					<Text>Transaction</Text>
				</Pressable>
				<Pressable onPress={()=>{router.navigate('order')}} className='flex items-center justify-center h-32 border rounded-lg shadow-lg border-neutral-800 aspect-square'>
					<Feather name='clipboard' size={42} color='black' />
					<Text>Order</Text>
				</Pressable>
			</View>
		</Layout>
	);
};

export default Home;
