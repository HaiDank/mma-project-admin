import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { useGlobalContext } from '../context/GlobalProvider';

const Loader = () => {
	const { loading } = useGlobalContext();

	if (!loading) return null;
    
	return (
		<ActivityIndicator
			animating={true}
			size={'large'}
			color={'"#00ff00'}
			className='absolute z-10 bg-neutral-600/30 flex-1 w-full h-screen top-0 left-0'
		/>
	);
};

export default Loader;
