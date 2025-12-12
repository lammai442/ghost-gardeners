import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { router } from '@mojjen/router';
import './index.scss';
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);

/**
 * Author: StefanMogren
 *
 * Adjusted how BrowserRouter and RouterProvider is set up
 */
