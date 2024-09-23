import { lazy } from 'react';

const Login = lazy(() => import('../pages/Authentication/Login'));

const publicRoutes = [
    {
        path: '*',
        element: <Login />,
    },
];

export { publicRoutes };
