import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleCategoriesCharts } from './DeprecatedArticleCategoriesCharts/DeprecatedArticleCategoriesCharts';
import { RedesignedArticleCategoriesCharts } from './RedesignedArticleCategoriesCharts/RedesignedArticleCategoriesCharts';
import { ArticleCategoriesChartsProps } from '../../model/types/types';

export const ArticleCategoriesCharts = memo(
    (props: ArticleCategoriesChartsProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedArticleCategoriesCharts {...props} />}
                off={<DeprecatedArticleCategoriesCharts {...props} />}
            />
        );
    },
);
