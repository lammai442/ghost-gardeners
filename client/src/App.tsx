import './App.scss';
import { HeaderComp } from '@mojjen/header';
import { FooterComp } from '@mojjen/footer';
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
				<HeaderComp />

				<Outlet />

				<FooterComp />
			</div>
		</>
	);
}

export default App;
