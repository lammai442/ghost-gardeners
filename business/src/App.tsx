import './App.scss';
import { Outlet } from 'react-router-dom';
import { useWebSocketHook } from '@mojjen/usewebsockethook';

/**
 * Modified: StefanMogren
 *
 * Adjusted how BrowserRouter and RouterProvider is set up
 */

function App() {
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
