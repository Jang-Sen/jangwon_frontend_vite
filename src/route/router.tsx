import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import ErrorPage from './error-page.tsx';
import Main from '../pages/Main.tsx';
import Login from '../pages/Login.tsx';
import Signup from '../pages/Signup.tsx';
import Profile from '../pages/Profile.tsx';
import FindPassword from '../pages/FindPassword.tsx';
import ChangePassword from '../pages/ChangePassword.tsx';

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
      {
        path: '/find/password',
        element: <FindPassword />,
      },
      {
        path: '/change/password',
        element: <ChangePassword />,
      },
    ],
  },
]);
