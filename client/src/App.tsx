import './App.scss';
import { HeaderComp } from '@mojjen/header';
import { FooterComp } from '@mojjen/footer';
import { Outlet } from 'react-router-dom';
// import { useWebsocketStore } from '@mojjen/usewebsocketstore';
import { useWebSocketHook } from '@mojjen/usewebsockethook';
/**
 * Modified: StefanMogren
 *
 * Adjusted how BrowserRouter and RouterProvider is set up
 */

function App() {
	// Initializes the WebSocket when the webpage is loaded.
	useWebSocketHook();

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
