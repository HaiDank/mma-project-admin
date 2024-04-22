import { View, Text, Pressable } from 'react-native';
import React from 'react';

const RoundedButton = ({ children, size = 'md', onPress }) => {
	let width = 48;
	let height = 48;

	if (size === 'lg') {
		width = 58;
		height = 58;
	}
	if (size === 'sm') {
		width = 32;
		height = 32;
	}

	const handleOnPress = () => {
		if(onPress){
			onPress()
		}
	}

	return (
		<Pressable
		onPress={handleOnPress}
			style={({ pressed }) => [
				{
					borderRadius: 1000,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: width,
					height: height,

					backgroundColor: pressed
						? 'rgba(50,50,50,0.9)'
						: 'rgba(50,50,50,0.4)',
				},
			]}
		>
			{children}
		</Pressable>
	);
};

export default RoundedButton;
