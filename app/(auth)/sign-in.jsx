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
import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState();
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const handleState = () => {
		setShowPassword((showState) => {
			return !showState;
		});
	};

	useEffect(() => {
		console.log(email);
	}, [email]);
	useEffect(() => {
		console.log(password);
	}, [password]);

	const validateForm = () => {
		if (!email) {
			setErrorMsg('Please enter an email address');
			return false;
		}

		if (!password) {
			setErrorMsg('Please enter a password');
			return false;
		}
		setErrorMsg('');
	};

	const handleSubmit = () => {
		validateForm();
	};

	const handleSubmitEditing = () => {
		console.log('edit');
		validateForm();
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			className='flex-1 bg-white '
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ScrollView className='flex-1 w-full px-4 bg-white gap-y-4'>
					<Text className='w-full text-3xl font-semibold text-center'>
						Orchid
					</Text>

					<TextInput
						placeholder='Email'
						textContentType='emailAddress'
						autoFocus
						onSubmitEditing={() => handleSubmitEditing()}
						onChangeText={setEmail}
						value={email}
						className='p-4 text-lg font-medium border rounded-xl'
					></TextInput>

					<View className='relative w-full '>
						<TextInput
							placeholder='Password'
							onSubmitEditing={() => handleSubmitEditing()}
							secureTextEntry={!showPassword}
							onChangeText={setPassword}
							value={password}
							textContentType='newPassword'
							className='p-4 text-lg font-medium border rounded-xl'
						></TextInput>
						<Pressable
							onPress={handleState}
							className='absolute z-10 p-3 right-2 top-2'
						>
							{showPassword ? (
								<Feather name='eye' size={24} color='black' />
							) : (
								<Feather
									name='eye-off'
									size={24}
									color='black'
								/>
							)}
						</Pressable>
					</View>
					<Text className='text-sm font-medium leading-none text-red-600'>
						{errorMsg}
					</Text>

					<View>
						<Pressable
							onPress={handleSubmit}
							className='flex items-center justify-center px-4 py-2 mb-4 bg-green-400 border rounded-full'
						>
							<Text className='text-lg font-semibold text-black'>
								Sign in
							</Text>
						</Pressable>
						<Pressable className='flex items-center justify-center px-4 py-2 bg-white border rounded-full'>
							<Text className='text-lg font-semibold text-black'>
								Sign up
							</Text>
						</Pressable>
					</View>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default SignIn;
