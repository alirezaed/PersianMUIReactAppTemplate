import { Navigate, useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import NotFound from './pages/Page404';
import { login } from './store/slices/authSlice';

// ----------------------------------------------------------------------

export default function Router() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLoggin = useSelector((state) => state.auth.isLoggin);
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const fullname = window.localStorage.getItem('fullname');
    if (token && !isLoggin) {
      dispatch(login({ accessToken: token, fullname }));
    }
    if (token && pathname === '/') navigate('/dashboard/app');
  }, [dispatch, navigate, isLoggin, pathname]);
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/classes" replace /> },
        { path: 'classes', element: <DashboardApp /> },
        { path: 'mentors', element: <DashboardApp /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Login /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    }
  ]);
}
