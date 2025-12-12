import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@mojjen/homepage';
import { MenuPage } from '@mojjen/menupage';
import { AboutPage } from '@mojjen/aboutpage';
import { ErrorPage } from '@mojjen/error-page';
import { ConfirmedOrderPage } from '@mojjen/confirmedorderpage';
import { CartPage } from '@mojjen/cartpage';
import App from '../../../../src/App';
import { ProfilePage } from '@mojjen/profilepage';
import { ProtectedRoute } from '@mojjen/protectedroute';
import { UnderConstructionPage } from '@mojjen/under-construction-page';

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
				path: '/menu',
				element: <MenuPage />,
			},
			{
				path: '/cart',
				element: <CartPage />,
			},
			{
				path: '/order',
				element: <ConfirmedOrderPage />,
			},
			{
				path: '/about',
				element: <AboutPage />,
			},
			{
				path: '/buildmeal',
				element: <UnderConstructionPage />,
			},
			{
				path: '/profile',
				element: (
					// If a user who's isn't logged in tries to access "/profile", they are redirected back to the homepage.
					<ProtectedRoute>
						<ProfilePage />
					</ProtectedRoute>
				),
			},
			{
				path: '*',
				element: <ErrorPage />,
			},
		],
	},
]);

/**
 * Modified: StefanMogren
 *
 * Adjusted how BrowserRouter and RouterProvider is set up
 *
 * Modified: Klara
 * Switched from under construction page to about page on the about route.
 *
 * Modified: Klara
 * ProtectedRoute added
 *
 * Modified: Klara
 * Added /buildmeny with a under construction page as element.
 */
