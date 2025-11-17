import './App.scss';
import { router } from '@mojjen/router';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
