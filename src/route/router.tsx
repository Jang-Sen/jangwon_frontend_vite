import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import ErrorPage from './error-page.tsx';
import Main from '../pages/main.tsx';
import Login from '../pages/login.tsx';
import Signup from '../pages/signup.tsx';
import Profile from '../pages/profile.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);
