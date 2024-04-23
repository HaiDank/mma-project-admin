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
	Modal,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { displayDateOfBirth } from '../../../../utils/time';
import MyButton from '../../../../components/MyButton';
import ProductCatalog from '../../../../components/ProductCatalog';
import { useCreateAuction } from '../../../../hooks/use-auction-data';

const CreateAuction = () => {
	const { error } = useLocalSearchParams();

	const [dateValues, setDateValues] = useState({
		startDate: new Date(Date.now()),
		endDate: new Date(Date.now()),
		remindAt: new Date(Date.now()),
	});
	const [productID, setProductID] = useState();
	const [title, setTitle] = useState('');
	const [showProducts, setShowProducts] = useState(false);
	const [startPrice, setStartPrice] = useState('');
	const [depositPrice, setDepositPrice] = useState('');
	const [quantity, setQuantity] = useState('');
	const [image_url, setImageUrl] = useState('');

	const [errorMsg, setErrorMsg] = useState(error ? error : '');

	const scrollRef = useRef();

	const { mutate: createAuction } = useCreateAuction();

	const handleDatePick = (e, valueName) => {
		const currentDate = new Date(e.nativeEvent.timestamp);
		if (!currentDate || !valueName) {
			return;
		}
		setDateValues((prev) => ({ ...prev, [valueName]: currentDate }));
	};

	const showMode = (valueName) => {
		console.log(valueName);
		if (valueName === 'startDate') {
			DateTimePickerAndroid.open({
				value: new Date(Date.now()),
				onChange: (e) => handleDatePick(e, valueName),
				minimumDate: new Date(Date.now()),
				maximumDate: dateValues.endDate
					? dateValues.endDate
					: undefined,
				mode: 'date',
				is24Hour: true,
			});
		} else if (valueName === 'endDate') {
			DateTimePickerAndroid.open({
				value: new Date(Date.now()),
				onChange: (e) => handleDatePick(e, valueName),
				minimumDate: dateValues.startDate
					? dateValues.startDate
					: new Date(Date.now()),
				mode: 'date',
				is24Hour: true,
			});
		} else {
			DateTimePickerAndroid.open({
				value: new Date(Date.now()),
				onChange: (e) => handleDatePick(e, valueName),
				minimumDate: dateValues.startDate
					? dateValues.startDate
					: new Date(Date.now()),
				maximumDate: dateValues.endDate
					? dateValues.endDate
					: undefined,
				mode: 'date',
				is24Hour: true,
			});
		}
	};

	const showProductCatalog = () => {
		setShowProducts(true);
	};

	const validateForm = () => {
		scrollRef?.current.scrollTo({ x: 0, y: 0, animated: true });
		const startDate = dateValues.startDate;
		const endDate = dateValues.endDate;
		const remindAt = dateValues.remindAt;
		if (!title) {
			setErrorMsg('Please enter a title');
			return;
		}
		if (!productID) {
			setErrorMsg('Please choose a product');
			return;
		}
		if (!startPrice) {
			setErrorMsg('Please enter a price');
			return;
		}
		if (startPrice < 10000) {
			setErrorMsg('Start price must be greate or equal to 10000');
			return;
		}
		if (!depositPrice) {
			setErrorMsg('Please enter a deposit price');
			return;
		}
		if (depositPrice < 50000) {
			setErrorMsg('Deposite price must be greate or equal to 50000');
			return;
		}
		if (!quantity) {
			setErrorMsg('Please enter a quantity');
			return;
		}
		if (quantity < 0) {
			setErrorMsg('Quantity must be greater than 0');
			return;
		}
		if (!image_url) {
			setErrorMsg('Please enter an image url');
			return;
		}
		if (!startDate) {
			setErrorMsg('Please select a start date');
			return;
		}
		if (!endDate) {
			setErrorMsg('Please select an end date');
			return;
		}
		if (!remindAt) {
			setErrorMsg('Please select a remind date');
			return;
		}
		setErrorMsg('');
		return true;
	};

	const handleSubmit = async () => {
		const validationResult = validateForm();

		if (validationResult) {
			const startDate = dateValues.startDate.toISOString().replace('Z', '');
			const endDate = dateValues.endDate.toISOString().replace('Z', '');
			const remindAt = dateValues.remindAt.toISOString().replace('Z', '');

			console.log(
				JSON.stringify({
					endDate,
					startDate,
					title,
					depositPrice,
					quantity,
					startPrice,
					remindAt,
					productID,
					image_url,
				})
			);

			createAuction({
				endDate,
				startDate,
				title,
				depositPrice,
				quantity,
				startPrice,
				remindAt,
				productID,
				image_url,
			});
			router.back()
		}
	};

	const handleProductSelect = (id) => {
		console.log(id);
		try {
			setProductID(id.toString());
		} catch (err) {
			console.log(err);
		}
		setShowProducts(false);
	};

	const handleSubmitEditing = () => {
		handleSubmit();
	};

	return (
		<>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				className='flex-1 bg-white'
			>
				<ScrollView
					ref={scrollRef}
					className='flex-1 w-full px-4 bg-white gap-y-4'
				>
					<Text className='my-2 text-sm font-medium leading-none text-red-600'>
						{errorMsg}
					</Text>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<TextInput
							placeholder='Title'
							textContentType='name'
							value={title}
							onChangeText={setTitle}
							autoCapitalize='none'
							autoFocus
							onSubmitEditing={() => handleSubmitEditing()}
							className='p-4 text-lg font-medium border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
						></TextInput>
					</TouchableWithoutFeedback>

					<Pressable onPress={() => showProductCatalog()}>
						<TextInput
							placeholder='Select Product ID'
							textContentType='name'
							value={productID}
							editable={false}
							className='p-4 text-lg font-medium text-black border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
						/>
					</Pressable>

					<View className='relative w-full '>
						<TextInput
							placeholder='Start price'
							autoCapitalize='none'
							value={startPrice}
							onChangeText={setStartPrice}
							keyboardType='numeric'
							onSubmitEditing={() => handleSubmitEditing()}
							className='p-4 text-lg font-medium border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
						></TextInput>
					</View>

					<View className='relative w-full '>
						<TextInput
							placeholder='Deposit price'
							autoCapitalize='none'
							keyboardType='numeric'
							value={depositPrice}
							onChangeText={setDepositPrice}
							onSubmitEditing={() => handleSubmitEditing()}
							className='p-4 text-lg font-medium border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
						></TextInput>
					</View>

					<View className='relative w-full '>
						<TextInput
							placeholder='Quantity'
							autoCapitalize='none'
							keyboardType='numeric'
							value={quantity}
							textContentType='none'
							onChangeText={setQuantity}
							onSubmitEditing={() => handleSubmitEditing()}
							className='p-4 text-lg font-medium border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
						></TextInput>
					</View>

					<TextInput
						placeholder='Image Url'
						textContentType='URL'
						value={image_url}
						onChangeText={setImageUrl}
						onSubmitEditing={() => handleSubmitEditing()}
						className='p-4 text-lg font-medium border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
					></TextInput>

					<Pressable onPress={() => showMode('startDate')}>
						<Text className='mb-2 text-sm font-semibold'>
							Start Date
						</Text>
						<TextInput
							placeholder='Start Date'
							textContentType='birthdate'
							value={
								dateValues.startDate
									? displayDateOfBirth(dateValues.startDate)
									: ''
							}
							editable={false}
							className='p-4 text-lg font-medium text-black border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
							onSubmitEditing={() => handleSubmitEditing()}
						/>
					</Pressable>

					<Pressable onPress={() => showMode('endDate')}>
						<Text className='mb-2 text-sm font-semibold'>
							End Date
						</Text>
						<TextInput
							placeholder='Start Date'
							textContentType='birthdate'
							value={
								dateValues.endDate
									? displayDateOfBirth(dateValues.endDate)
									: ''
							}
							editable={false}
							className='p-4 text-lg font-medium text-black border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
							onSubmitEditing={() => handleSubmitEditing()}
						/>
					</Pressable>

					<Pressable onPress={() => showMode('remindAt')}>
						<Text className='mb-2 text-sm font-semibold'>
							Remind At
						</Text>
						<TextInput
							placeholder='Start Date'
							textContentType='birthdate'
							value={
								dateValues.remindAt
									? displayDateOfBirth(dateValues.remindAt)
									: ''
							}
							editable={false}
							className='p-4 text-lg font-medium text-black border border-white rounded-xl focus:border-black bg-neutral-200 focus:bg-transparent'
							onSubmitEditing={() => handleSubmitEditing()}
						/>
					</Pressable>

					<View className='flex flex-row w-full gap-x-4'>
						<Pressable
							onPress={() => {
								router.back();
							}}
							className='flex items-center justify-center flex-1 px-4 py-2 mb-4 border rounded-full'
						>
							<Text className='text-lg font-semibold text-red-600'>
								Cancel
							</Text>
						</Pressable>
						<Pressable
							onPress={handleSubmit}
							className='flex items-center justify-center flex-1 px-4 py-2 mb-4 border rounded-full'
						>
							<Text className='text-lg font-semibold text-green-700'>
								Create Auction
							</Text>
						</Pressable>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
			<Modal
				onRequestClose={() => setShowProducts(false)}
				animationType='slide'
				transparent={true}
				visible={showProducts}
			>
				<View className='absolute bottom-0 z-20 w-full h-full overflow-hidden bg-white rounded-2xl'>
					<View className='flex flex-row items-center justify-between w-full h-16 px-4 shadow-lg bg-neutral-200'>
						<Text className='text-xl font-medium'>
							Select auctioned product
						</Text>
						<MyButton
							style={{ width: 48, height: 48 }}
							onPress={() => setShowProducts(false)}
						>
							<Feather name='x' size={24} color='black' />
						</MyButton>
					</View>
					<View className='p-4'>
						<ProductCatalog onSelect={handleProductSelect} />
					</View>
				</View>
			</Modal>
		</>
	);
};

export default CreateAuction;
