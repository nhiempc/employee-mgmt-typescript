import { Fragment, lazy, Suspense } from 'react';
import { PATH_NAME } from '../configs';
import { Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import NoLayout from '../layouts/NoLayout';
import { IRoutes } from '../models/ICommon';

const PendingContainer = lazy(() => import('../components/Pending'));
const ApprovedContainer = lazy(() => import('../components/Approved'));
const NewEmployeeContainer = lazy(() => import('../components/NewEmployee'));
const ManageEmployeeContainer = lazy(
    () => import('../components/ManageEmployee')
);
const FinishEmployeeContainer = lazy(
    () => import('../components/FinishEmployee')
);
const SignIn = lazy(() => import('../components/SignIn'));

const routesConfig: IRoutes[] = [
    {
        path: PATH_NAME.ROOT,
        layout: MainLayout,
        routes: [
            {
                exact: true,
                path: PATH_NAME.PENDING,
                component: PendingContainer
            },
            {
                exact: true,
                path: PATH_NAME.APPROVED,
                component: ApprovedContainer
            },
            {
                exact: true,
                path: PATH_NAME.NEW_EMPLOYEE,
                component: NewEmployeeContainer
            },
            {
                exact: true,
                path: PATH_NAME.MANAGE_EMPLOYEE,
                component: ManageEmployeeContainer
            },
            {
                exact: true,
                path: PATH_NAME.END_EMPLOYEE,
                component: FinishEmployeeContainer
            },
            {
                exact: true,
                path: PATH_NAME.SIGN_IN,
                component: SignIn,
                layout: NoLayout
            }
        ]
    }
];

const renderRoutes = (routes: IRoutes[]) => {
    return (
        <>
            {routes ? (
                <Suspense fallback={<div />}>
                    {routes.map((route, idx) => {
                        const Layout = route.layout || Fragment;
                        const Component = route.component;

                        return (
                            <Route
                                key={`routes-${idx}`}
                                path={route.path}
                                exact={route.exact}
                                render={(props) => (
                                    <Layout>
                                        {route.routes ? (
                                            renderRoutes(route.routes)
                                        ) : (
                                            <Component {...props} />
                                        )}
                                    </Layout>
                                )}
                            />
                        );
                    })}
                </Suspense>
            ) : null}
        </>
    );
};

function Routes() {
    return renderRoutes(routesConfig);
}

export default Routes;
