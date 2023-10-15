import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice'; // Import your weather slice or any other slices you have

const store = configureStore({
	reducer: {
		weather: weatherReducer, // Add your slice reducer here
	},
});

export default store;
