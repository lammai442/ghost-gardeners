import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@mojjen/homepage';
import { AuthPage } from '@mojjen/authpage';
import { UnderConstructionPage } from '@mojjen/under-construction-page';
import { MenuPage } from '@mojjen/menupage';
import { ErrorPage } from '@mojjen/error-page';
import { ConfirmedOrderPage } from '@mojjen/confirmedorderpage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/auth',
		element: <AuthPage />,
	},
	{
		path: '/menu',
		element: <MenuPage />,
	},
	{
		path: '/cart',
		element: <UnderConstructionPage />,
	},
	{
		path: '/order',
		element: <ConfirmedOrderPage />,
	},
	{
		path: '/about',
		element: <UnderConstructionPage />,
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);
