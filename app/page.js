'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './store/slices/weatherSlice';
import { SparklinesLine, Sparklines } from 'react-sparklines';

function calculateAverage(data) {
	if (data.length === 0) return 0;
	const sum = data.reduce((acc, value) => acc + value, 0);
	return Math.round(sum / data.length);
}

export default function Home() {
	const dispatch = useDispatch();
	const { city, temperature, pressure, humidity, loading, error } =
		useSelector((state) => state.weather);

	const [cityName, setCityName] = useState('');

	const handleSearch = () => {
		if (cityName) {
			dispatch(fetchWeather(cityName));
		}
	};

	return (
		<div className='bg-gray-100 min-h-screen py-6 sm:py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden'>
				<div className='px-6 py-4'>
					<h1 className='text-2xl font-semibold text-gray-900 mb-4'>
						Weather App
					</h1>
					<div className='flex items-center mb-4'>
						<input
							className='rounded-md py-2 px-3 mr-2 w-2/3 bg-gray-200 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none'
							type='text'
							placeholder='Enter city name'
							value={cityName}
							onChange={(e) => setCityName(e.target.value)}
						/>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none'
							onClick={handleSearch}
						>
							Search
						</button>
					</div>

					{/* Display weather data */}
					{loading && <p className='text-gray-600'>Loading...</p>}
					{error && <p className='text-red-600'>Error: {error}</p>}

					{city && (
						<div>
							<h2 className='text-lg font-semibold'>
								Weather in {city.name}
							</h2>
							<div className='mb-4'>
								<h3 className='text-sm font-semibold'>
									Temperature
								</h3>
								<Sparklines
									data={temperature}
									width={100}
									height={20}
								>
									<SparklinesLine color='blue' />
								</Sparklines>
								<p className='text-sm text-gray-700'>
									Average: {calculateAverage(temperature)}°F
								</p>
							</div>
							<div className='mb-4'>
								<h3 className='text-sm font-semibold'>
									Pressure
								</h3>
								<Sparklines
									data={pressure}
									width={100}
									height={20}
								>
									<SparklinesLine color='green' />
								</Sparklines>
								<p className='text-sm text-gray-700'>
									Average: {calculateAverage(pressure)} hPa
								</p>
							</div>
							<div>
								<h3 className='text-sm font-semibold'>
									Humidity
								</h3>
								<Sparklines
									data={humidity}
									width={100}
									height={20}
								>
									<SparklinesLine color='orange' />
								</Sparklines>
								<p className='text-sm text-gray-700'>
									Average: {calculateAverage(humidity)}%
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
