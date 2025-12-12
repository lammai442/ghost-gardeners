import { createBrowserRouter } from 'react-router-dom';
import { AuthPage } from '@mojjen/authpage';
import { OrderPage } from '@mojjen/orderpage';
import { ProductPage } from '@mojjen/productpage';
import App from '../../../../src/App';

import { ProtectedRoute } from '@mojjen/protectedroute';
import { ErrorPage } from '@mojjen/errorPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <ProtectedRoute element={<OrderPage />} />,
			},
			{
				path: '/products',
				element: <ProtectedRoute element={<ProductPage />} />,
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
