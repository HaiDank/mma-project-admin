import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = useState({
		authenticated: false,
		role: null,
		username: null,
	});

	const login = (username, password) => {
		// login
	};

	const logout = () => {
		setAuthState({
			authenticated: false,
			role: null,
			username: null,
		});
	};

	return (
		<AuthContext.Provider value={{ login, logout, authState }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
