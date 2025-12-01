import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@mojjen/homepage';
import { AuthPage } from '@mojjen/authpage';
import { OrderPage } from '@mojjen/orderpage';
import App from '../../../../src/App';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/auth',
				element: <AuthPage />,
			},
			{
				path: '/orders',
				element: <OrderPage />,
			},
		],
	},
]);
