import './App.scss';
import './variables.scss';
import { router } from '@mojjen/router';
import { RouterProvider } from 'react-router-dom';
import { HeaderComp } from '@mojjen/header';
import { FooterComp } from '@mojjen/footer';

function App() {
	return (
		<>
			<div className="app">
				<HeaderComp />
				<RouterProvider router={router} />
				<FooterComp />
			</div>
		</>
	);
}

export default App;
