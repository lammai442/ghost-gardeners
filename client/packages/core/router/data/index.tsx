import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@mojjen/homepage';
import { AuthPage } from '@mojjen/authpage';
import { MenuPage } from '../../../pages/menupage/ui';

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
]);
