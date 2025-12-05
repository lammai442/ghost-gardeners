import { createBrowserRouter } from 'react-router-dom';
import { AuthPage } from '@mojjen/authpage';
import { OrderPage } from '@mojjen/orderpage';
import App from '../../../../src/App';
import { ProtectedRoute } from '../../../base/protectedroute/ui';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <ProtectedRoute element={<OrderPage />} />,
			},
			{
				path: '/auth',
				element: <AuthPage />,
			},
		],
	},
]);

/**
 * Author: Lam Mai
 * Added protected route for index page
 *
 */
