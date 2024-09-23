import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';
import { publicRoutes } from './publicRoutes';

const privateRoutes = routes.map((route) => {
    return {
        ...route,
        element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>,
    };
});

export const getRoutes = (isTokenExists: boolean) => {
    return isTokenExists ? createBrowserRouter(privateRoutes) : createBrowserRouter(publicRoutes);
};
