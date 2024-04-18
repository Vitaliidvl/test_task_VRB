import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import MovieDetail from './components/pages/MovieDetail.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>404 not found</h1>,
  },
  {
    path: '/details',
    element: <MovieDetail />,
    children: [
      {
        path: '/details/:movieId',
        element: <MovieDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} fallbackElement={<h1>Loading...</h1>} />,
);
