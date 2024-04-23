import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import RoundedButton from './RoundedButton';
import { router, useSegments } from 'expo-router';
import { useAuthContext } from '../context/AuthContext';
import MyButton from './MyButton';
import { BlurView } from 'expo-blur';

const TabHeader = () => {
	const { logout } = useAuthContext();
	const segments = useSegments();

	const [openUserModal, setOpenUserModal] = useState(false);

	const handleLogout = () => {
		setOpenUserModal(false);
		logout();
	};

	return (
		<>
			{openUserModal && (
				<View className='absolute top-0 z-10 flex-1 w-full h-full bg-black/20'></View>
			)}
			<Modal
				onRequestClose={() => setOpenUserModal(false)}
				animationType='slide'
				transparent={true}
				visible={openUserModal}
			>
				<TouchableOpacity
					onPress={() => setOpenUserModal(false)}
					className='absolute top-0 z-10 flex-1 w-full h-full '
				>
					<View className='absolute bottom-0 z-20 w-full overflow-hidden bg-white rounded-2xl h-2/3'>
						<View className='flex flex-row items-center justify-between w-full h-12 px-4 bg-neutral-100'>
							<Text></Text>
							<MyButton
								style={{ width: 48, height: 48 }}
								onPress={() => setOpenUserModal(false)}
							>
								<Feather name='x' size={24} color='black' />
							</MyButton>
						</View>
						<View className='p-4'>
							<Pressable
								className='w-full h-12 '
								onPress={handleLogout}
							>
								<Text className='text-xl font-semibold text-blue-600 underline'>
									Log out
								</Text>
							</Pressable>
						</View>
					</View>
				</TouchableOpacity>
			</Modal>

			<BlurView
				intensity={100}
				className='absolute top-0 left-0 flex flex-row items-center w-full h-16 px-4 '
			>
				<RoundedButton
					normalColor='rgba(0,0,0,0.7)'
					pressColor='rgba(0,0,0,0.5)'
					color
					onPress={() => {
						setOpenUserModal(true);
					}}
				>
					<Feather name='user' size={24} color='white' />
				</RoundedButton>
			</BlurView>
			{segments[2] === 'home' ? (
				''
			) : (
				<View className='absolute z-10 flex items-center justify-center bottom-4 right-4'>
					<RoundedButton
						onPress={() => {
							router.push('(admin)/home');
						}}
					>
						<Feather name='home' size={32} color='black' />
					</RoundedButton>
				</View>
			)}
		</>
	);
};

export default TabHeader;
