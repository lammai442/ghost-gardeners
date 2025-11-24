import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { router } from '@mojjen/router';
import './index.scss';
// import App from './App.tsx';
import { RouterProvider } from 'react-router-dom';

/**
 * Modified: StefanMogren
 *
 * Adjusted how BrowserRouter and RouterProvider is set up
 */

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
		{/* <App /> */}
	</StrictMode>
	/* 	<StrictMode>
		<App />
	</StrictMode> */
);
