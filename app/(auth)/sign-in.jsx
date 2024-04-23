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
import { login } from '../../api/auth';
import { useAuthContext } from '../../context/AuthContext';

const SignIn = () => {

	const {error} = useLocalSearchParams()

	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState();
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState(error ? error : '');

	const passwordInputRef = useRef();
	const emailInputRef = useRef();

	const { login } = useAuthContext();

	const handleState = () => {
		setShowPassword((showState) => {
			return !showState;
		});
	};

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
		return true;
	};

	const handleSubmit = async () => {
		const validationResult = validateForm();

		if (validationResult) {
			login(email, password);
		}
	};

	const handleSubmitEditing = () => {
		if (!email) {
			emailInputRef.current.focus();
			setErrorMsg('Please enter an email address');
			return;
		}
		if (!password) {
			passwordInputRef.current.focus();
			setErrorMsg('Please enter a password');
			return;
		}
		handleSubmit();
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			className='flex-1 bg-white '
		>
			<ScrollView className='flex-1 w-full px-4 bg-white gap-y-4'>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<Text className='w-full py-4 text-3xl font-semibold text-center'>
						Orchid Dashboard
					</Text>
				</TouchableWithoutFeedback>

				<TextInput
					ref={emailInputRef}
					placeholder='Email'
					textContentType='emailAddress'
					autoCapitalize='none'
					autoFocus
					onSubmitEditing={() => handleSubmitEditing()}
					onChangeText={setEmail}
					value={email}
					className='p-4 text-lg font-medium border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
				></TextInput>

				<View className='relative w-full '>
					<TextInput
						ref={passwordInputRef}
						placeholder='Password'
						autoCapitalize='none'
						onSubmitEditing={() => handleSubmitEditing()}
						secureTextEntry={!showPassword}
						onChangeText={setPassword}
						value={password}
						textContentType='newPassword'
						className='p-4 text-lg font-medium border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
					></TextInput>
					<Pressable
						onPress={handleState}
						className='absolute z-10 p-3 right-2 top-2'
					>
						{showPassword ? (
							<Feather name='eye' size={24} color='black' />
						) : (
							<Feather name='eye-off' size={24} color='black' />
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
					{/* <Pressable
						onPress={() => {
							router.navigate('/sign-up');
						}}
						className='flex items-center justify-center px-4 py-2 bg-white border rounded-full'
					>
						<Text className='text-lg font-semibold text-black'>
							Sign up
						</Text>
					</Pressable> */}
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default SignIn;
