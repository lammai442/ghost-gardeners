import './App.scss';
import { HeaderComp } from '@mojjen/header';
import { FooterComp } from '@mojjen/footer';
import { Outlet } from 'react-router-dom';
import { useWebSocketHook } from '@mojjen/usewebsockethook';
import { useEffect, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '@mojjen/useauthstore';

function App() {
	const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
	const headerRef = useRef<HTMLHeadingElement>(null);

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
		};

		checkTokenExp();

		const interval = setInterval(checkTokenExp, 60000);
		return () => clearInterval(interval);
	}, [user, logout]);

	// Keeps track on page scroll and toggles sticky header styling
	const handleScroll = (elTopOffset: number, elHeight: number) => {
		if (window.pageYOffset > elTopOffset + elHeight) {
			setSticky({ isSticky: true, offset: elHeight });
		} else {
			setSticky({ isSticky: false, offset: 0 });
		}
	};

	// Add/remove scroll event listener
	useEffect(() => {
		if (headerRef.current === null) return;
		const header = headerRef.current.getBoundingClientRect();
		const handleScrollEvent = () => {
			handleScroll(header.top, header.height);
		};

		window.addEventListener('scroll', handleScrollEvent);

		return () => {
			window.removeEventListener('scroll', handleScrollEvent);
		};
	}, []);

	return (
		<>
			<div className="app grid" style={{ marginTop: sticky.offset }}>
				<HeaderComp
					sticky={sticky}
					headerRef={headerRef}
					id={'sticky-header'}
				/>

				<Outlet />

				<FooterComp />
			</div>
		</>
	);
}

export default App;

/**
 * Author: StefanMogren
 *
 * Adjusted how BrowserRouter and RouterProvider is set up
 *
 * Update: Klara
 * Sticky header. Inspo: https://stackblitz.com/edit/sticky-header-react?file=src%2Findex.css
 */
