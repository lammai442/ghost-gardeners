import './App.scss';
import { HeaderComp } from '@mojjen/header';
import { FooterComp } from '@mojjen/footer';
import { Outlet } from 'react-router-dom';
// import { useWebsocketStore } from '@mojjen/usewebsocketstore';
import { useWebSocketHook } from '@mojjen/usewebsockethook';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '@mojjen/useauthstore';

/**
 * Modified: StefanMogren
 *
 * Adjusted how BrowserRouter and RouterProvider is set up
 */

function App() {
	// Initializes the WebSocket when the webpage is loaded.
	useWebSocketHook();

	const { user, logout } = useAuthStore();

	// If the token is expired the user gets logged out. The function checkTokenExp runs every 60 s.
	useEffect(() => {
		const checkTokenExp = () => {
			if (!user?.token) return;
			const decoded = jwtDecode(user.token);
			if (!decoded.exp) return;

			const isExpired = decoded.exp * 1000 < Date.now();
			isExpired && logout();
			console.log('checkTokenExp()');
		};

		checkTokenExp();

		const interval = setInterval(checkTokenExp, 60000);
		return () => clearInterval(interval);
	}, [user, logout]);

	return (
		<>
			<div className="app">
				<HeaderComp />

				<Outlet />

				<FooterComp />
			</div>
		</>
	);
}

export default App;
