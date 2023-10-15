// Import necessary dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an initial state
const initialState = {
	city: '',
	temperature: [],
	pressure: [],
	humidity: [],
	loading: false,
	error: null,
};

// Define an async thunk to fetch weather data
export const fetchWeather = createAsyncThunk(
	'weather/fetchWeather',
	async (city) => {
		try {
			const response = await axios.get(
				`https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWeather.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchWeather.fulfilled, (state, action) => {
				state.loading = false;
				state.city = action.payload.city;
				state.temperature = action.payload.list.map(
					(item) => item.main.temp
				);
				state.pressure = action.payload.list.map(
					(item) => item.main.pressure
				);
				state.humidity = action.payload.list.map(
					(item) => item.main.humidity
				);
			})
			.addCase(fetchWeather.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default weatherSlice.reducer;
