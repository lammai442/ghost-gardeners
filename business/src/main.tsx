import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from '@mojjen/router';

/**
 * Modified: StefanMogren
 *
 * Adjusted how BrowserRouter and RouterProvider is set up
 */

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
