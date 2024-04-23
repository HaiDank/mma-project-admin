import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { useGlobalContext } from '../context/GlobalProvider';

const Loader = ({loading}) => {

	if (!loading) return null;
    
	return (
		<ActivityIndicator
			animating={true}
			size={'large'}
			color={'"#00ff00'}
			className='absolute top-0 left-0 z-10 flex-1 w-full h-screen bg-black/50'
		/>
	);
};

export default Loader;
