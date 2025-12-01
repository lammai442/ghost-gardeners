import './App.scss';
import { Outlet } from 'react-router-dom';

/**
 * Modified: StefanMogren
 *
 * Adjusted how BrowserRouter and RouterProvider is set up
 */

function App() {
	return (
		<>
			<div className="app">
				<Outlet />
			</div>
		</>
	);
}

export default App;
