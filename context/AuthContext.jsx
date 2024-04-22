import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginAPI } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from './GlobalProvider';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const { setLoading } = useGlobalContext();

	const storeData = async (value) => {
		try {
			const jsonValue = JSON.stringify(value);
			setAuthState(value);
			await AsyncStorage.setItem('auth', jsonValue);
		} catch (e) {
			console.log('storedataerr', e);
		}
	};

	const getData = async () => {
		try {
			const value = await AsyncStorage.getItem('auth');
			return value != null ? value : null;
		} catch (e) {
			console.log('getdataerr', e);
		}
	};

	const [authState, setAuthState] = useState({
		authenticated: false,
		role: null,
		username: null,
		token: null,
		refreshToken: null,
	});

	const login = async (email, password) => {
		setLoading(true);
		const result = await loginAPI(email, password);

		if (result && result.status && result.status === 'SUCCESS') {
			storeData({
				authenticated: true,
				role: result.payload.role,
				username: result.payload.name,
				token: result.metadata.access_token,
				refreshToken: result.metadata.refresh_token,
			});
			console.log('login ', authState.token)
		}
		setLoading(false);
	};

	const logout = () => {
		setLoading(true);
		storeData({
			authenticated: false,
			role: null,
			username: null,
			token: null,
			refreshToken: null,
		});
		setLoading(false);
	};

	useEffect(() => {
		const initialData = getData().then((res) => {
			if (res != null) {
				console.log('ini', res);
				setAuthState(JSON.parse(res));
			}
		});
	}, []);

	return (
		<AuthContext.Provider value={{ login, logout, authState }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
