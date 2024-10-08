import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AppRoutesProps } from '@/shared/types/router';
import { routeConfig } from '../../config/routeConfig';
import { PageLoader } from '@/widgets/PageLoader';
import { RequireAuth } from '../RequireAuth/RequireAuth';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const { skeleton } = route;

        const fallback = (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<route.skeleton.type {...route.skeleton.props} />}
                off={<PageLoader />}
            />
        );
        const element = (
            <Suspense fallback={fallback}>{route.element}</Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequireAuth roles={route.roles}>{element}</RequireAuth>
                    ) : (
                        element
                    )
                }
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
