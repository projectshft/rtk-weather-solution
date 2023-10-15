'use client';
import { Provider } from 'react-redux';
import store from './store/store'; // Im
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Provider store={store}>{children}</Provider>
			</body>
		</html>
	);
}
