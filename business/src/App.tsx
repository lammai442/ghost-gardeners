import './App.scss';
import { Outlet } from 'react-router-dom';
import { useWebSocketHook } from '@mojjen/usewebsockethook';
import { useEffect } from 'react';
import { useAuthStore } from '@mojjen/useauthstore';
import { jwtDecode } from 'jwt-decode';

function App() {
	const { user, logout } = useAuthStore();

	// If the token is expired the user gets logged out. The function checkTokenExp runs every 60 s.
	useEffect(() => {
		const checkTokenExp = () => {
			if (!user?.token) return;
			const decoded = jwtDecode(user.token);
			if (!decoded.exp) return;

			const isExpired = decoded.exp * 1000 < Date.now();
			isExpired && logout();
		};

		checkTokenExp();

		const interval = setInterval(checkTokenExp, 60000);
		return () => clearInterval(interval);
	}, [user, logout]);

	useWebSocketHook();
	return (
		<>
			<div className="app">
				<Outlet />
			</div>
		</>
	);
}

export default App;

/**
 * Update: StefanMogren
 *
 * Adjusted how BrowserRouter and RouterProvider is set up
 */
