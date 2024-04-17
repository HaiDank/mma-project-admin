import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
	
	const [loading, setLoading] = useState(true);



	return (
		<GlobalContext.Provider
			value={{
				loading,
				setLoading
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
