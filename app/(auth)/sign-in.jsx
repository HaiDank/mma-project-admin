import { View, Text, Platform } from 'react-native';
import React from 'react';
import { AlertCircleIcon, Box, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText, Input, InputField, KeyboardAvoidingView } from '@gluestack-ui/themed';

const SignIn = () => {
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'height' : 'height'}
			style={{ flex: 1, zIndex: 999 }}
		>
			<Box h='$32' w='$72'>
				<FormControl
					size='md'
					isDisabled={false}
					isInvalid={false}
					isReadOnly={false}
					isRequired={false}
				>
					<FormControlLabel mb='$1'>
						<FormControlLabelText>Password</FormControlLabelText>
					</FormControlLabel>
					<Input>
						<InputField
							type='password'
							defaultValue='12345'
							placeholder='password'
						/>
					</Input>
					<FormControlHelper>
						<FormControlHelperText>
							Must be at least 6 characters.
						</FormControlHelperText>
					</FormControlHelper>
					<FormControlError>
						<FormControlErrorIcon as={AlertCircleIcon} />
						<FormControlErrorText>
							At least 6 characters are required.
						</FormControlErrorText>
					</FormControlError>
				</FormControl>
			</Box>
		</KeyboardAvoidingView>
	);
};

export default SignIn;
