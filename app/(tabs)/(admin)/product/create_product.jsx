import {
	View,
	Text,
	Platform,
	TextInput,
	Pressable,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';


const CreateProduct = () => {
	const { error } = useLocalSearchParams();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [date, setDate] = useState(new Date(Date.now()));
	const [productName, setProductName] = useState();
	const [image, setImage] = useState('');
	const [quantity, setQuantity] = useState('');
	const [description, setDescription] = useState('');
	const [errorMsg, setErrorMsg] = useState(error ? error : '');



	// const onChange = (event, selectedDate) => {
	// 	const currentDate = selectedDate;
	// 	setDate(currentDate);
	// 	console.log(currentDate)
	// };

	// const showMode = () => {
	// 	DateTimePickerAndroid.open({
	// 		value: date,
	// 		onChange,
	// 		mode: 'date',
	// 		is24Hour: true,
	// 	});
	// };

	// const handleState = () => {
	// 	setShowPassword((showState) => {
	// 		return !showState;
	// 	});
	// };

	const validateForm = () => {
		if (!productName) {
			setErrorMsg('Please enter an word!');
			return false;
		}
		if (!image) {
			setErrorMsg('Please enter an URL !');
			return false;
		}
		if (!quantity) {
			setErrorMsg('Please enter the number!');
			return false;
		}
		if (!description) {
			setErrorMsg('Please enter a word!');
			return false;
		}
		setErrorMsg('');
		return true;
	};

	const handleSubmit = async () => {
		const validationResult = validateForm();

		if (validationResult) {
		}
	};

	const handleSubmitEditing = () => {
		handleSubmit();
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			className='flex-1 bg-white'
		>
			<ScrollView className='flex-1 w-full px-4 bg-white gap-y-4'>
				<Text className='my-2 text-sm font-medium leading-none text-red-600'>
					{errorMsg}
				</Text>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<TextInput
						placeholder='Product Name'
						textContentType='NameProduct'
						autoCapitalize='none'
						autoFocus
						onSubmitEditing={() => handleSubmitEditing()}
						onChangeText={setProductName}
						value={productName}
						className='p-4 text-lg font-medium border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
					></TextInput>
				</TouchableWithoutFeedback>

				<View className='relative w-full '>
					<TextInput
						placeholder='Image'
						autoCapitalize='none'
						onSubmitEditing={() => handleSubmitEditing()}
						onChangeText={setImage}
						value={image}
						textContentType='ImageP'
						className='p-4 text-lg font-medium border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
					></TextInput>
				</View>
				<View className='relative w-full '>
					<TextInput
						placeholder='Quantity'
						autoCapitalize='none'
						onSubmitEditing={() => handleSubmitEditing()}
						onChangeText={setQuantity}
						value={quantity}
						textContentType='number'
						className='p-4 text-lg font-medium border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
					></TextInput>
				</View>

				<TextInput
					placeholder='Description'
					textContentType='decription'
					onSubmitEditing={() => handleSubmitEditing()}
					onChangeText={setDescription}
					value={description}
					className='p-4 text-lg font-medium border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
				></TextInput>

				<View>
					<Pressable
						onPress={handleSubmit}
						className='flex items-center justify-center px-4 py-2 mb-4 border rounded-full'
					>
						<Text className='text-lg font-semibold text-black'>
							Create 
						</Text>
					</Pressable>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default CreateProduct;