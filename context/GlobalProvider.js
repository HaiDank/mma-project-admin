import React, { createContext, useContext, useEffect, useState } from 'react';
import { storeData, updateFavouriteList } from '../utils/db';

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
