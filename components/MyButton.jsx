import { View, Text, Pressable } from 'react-native';
import React from 'react';

const MyButton = ({ children, className, onPress }) => {
	const handleOnPress = () => {
		if (onPress) {
			onPress();
		}
	};

	return (
		<Pressable
			onPress={handleOnPress}
			className={`${className} flex items-center justify-center w-12 h-12`}
		>
			{children}
		</Pressable>
	);
};

export default MyButton;
