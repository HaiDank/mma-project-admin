import { View, Text, Pressable } from 'react-native';
import React from 'react';

const MyButton = ({ children, style, onPress }) => {
	const handleOnPress = () => {
		if (onPress) {
			onPress();
		}
	};

	return (
		<Pressable
			onPress={handleOnPress}
			style={({ pressed }) => [
				{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: pressed
						? 'rgba(50,50,50,0.4)'
						: 'rgba(50,50,50,0)',
				},
				style
			]}
		>
			{children}
		</Pressable>
	);
};

export default MyButton;
