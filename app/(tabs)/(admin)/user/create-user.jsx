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
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { displayDateOfBirth } from '../../../../utils/time';
import { Checkbox } from 'react-native-paper';
import { useCreateUser } from '../../../../hooks/use-user-data';

const CreateUser = () => {
	const { error } = useLocalSearchParams();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [date, setDate] = useState(new Date(Date.now()));
	const [email, setEmail] = useState();
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [name, setName] = useState('');
	const [gender, setGender] = useState('MALE');
	const [image_url, setImg] = useState('https://picsum.photos/200/300');
	const [dob, setDob] = useState('');
	const [errorMsg, setErrorMsg] = useState(error ? error : '');

	const passwordInputRef = useRef();
	const emailInputRef = useRef();

	const { mutate: registerUser } = useCreateUser();

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setDob(currentDate);
	};

	const showMode = () => {
		DateTimePickerAndroid.open({
			value: date,
			onChange,
			maximumDate: date,
			mode: 'date',
			is24Hour: true,
		});
	};

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
		if (!confirmPassword) {
			setErrorMsg('Please confirm your password');
			return false;
		}
		if (confirmPassword !== password) {
			setErrorMsg('Passwords do not match!');
			return false;
		}
		if (!name) {
			setErrorMsg('Please enter a name');
			return false;
		}
		if (!dob) {
			setErrorMsg('Please enter a birth date');
			return false;
		}
		if (!gender) {
			setErrorMsg('Please select gender');
			return false;
		}
		setErrorMsg('');
		return true;
	};

	const handleSubmit = async () => {
		const validationResult = validateForm();

		if (validationResult) {
			registerUser({ email, password, name, dob, gender, image_url });
			router.back()
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
			className='flex-1 bg-white'
		>
			<ScrollView className='flex-1 w-full px-4 bg-white gap-y-4'>
				<Text className='my-2 text-sm font-medium leading-none text-red-600'>
					{errorMsg}
				</Text>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
				</TouchableWithoutFeedback>

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
				<View className='relative w-full '>
					<TextInput
						placeholder='Confirm password'
						autoCapitalize='none'
						onSubmitEditing={() => handleSubmitEditing()}
						secureTextEntry={!showConfirmPassword}
						onChangeText={setConfirmPassword}
						value={confirmPassword}
						textContentType='newPassword'
						className='p-4 text-lg font-medium border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
					></TextInput>
					<Pressable
						onPress={() => {
							setShowConfirmPassword((prev) => !prev);
						}}
						className='absolute z-10 p-3 right-2 top-2'
					>
						{showConfirmPassword ? (
							<Feather name='eye' size={24} color='black' />
						) : (
							<Feather name='eye-off' size={24} color='black' />
						)}
					</Pressable>
				</View>

				<TextInput
					placeholder='Name'
					textContentType='name'
					onSubmitEditing={() => handleSubmitEditing()}
					onChangeText={setName}
					value={name}
					className='p-4 text-lg font-medium border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
				></TextInput>

				<Pressable onPress={() => showMode()}>
					<Text className='mb-2 text-sm font-semibold'>
						Date of Birth
					</Text>
					<TextInput
						placeholder='Date of Birth'
						textContentType='birthdate'
						value={dob ? displayDateOfBirth(dob) : ''}
						editable={false}
						className='p-4 text-lg font-medium text-black border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
						onSubmitEditing={() => handleSubmitEditing()}
					/>
				</Pressable>

				<View className='flex flex-row items-center gap-x-4'>
					<Text className='mb-2 text-sm font-semibold'>Gender:</Text>
					<View className='flex flex-row items-center'>
						<Checkbox
							status={
								gender === 'FEMALE' ? 'checked' : 'unchecked'
							}
							onPress={() => {
								setGender('FEMALE');
							}}
						/>
						<Text>Female</Text>
					</View>
					<View className='flex flex-row items-center'>
						<Checkbox
							status={gender === 'MALE' ? 'checked' : 'unchecked'}
							onPress={() => {
								setGender('MALE');
							}}
						/>
						<Text>Male</Text>
					</View>
				</View>

				<View>
					<Pressable
						onPress={handleSubmit}
						className='flex items-center justify-center px-4 py-2 mb-4 border rounded-full'
					>
						<Text className='text-lg font-semibold text-black'>
							Create User
						</Text>
					</Pressable>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default CreateUser;
