import React from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/common/Stack';
import { DonutChart } from '@/shared/ui/common/Charts/ui/DonutChart/DonutChart';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { ArticleCategoriesChartsProps } from '../ArticleCategoriesCharts';

export const DeprecatedArticleCategoriesCharts = (
    props: ArticleCategoriesChartsProps,
) => {
    const { t } = useTranslation('admin');

    const {
        labels: categoryLabels,
        articlesByCategories: articlesQuantityByCategoriesData,
        viewsByCategories: articleViewsByCategoriesData,
    } = props;
    return (
        <HStack gap="24" max>
            <CardDeprecated>
                <DonutChart
                    data={articlesQuantityByCategoriesData}
                    labels={categoryLabels}
                    title={t('Cтатті за категоріями, %')}
                    legendPosition="bottom"
                />
            </CardDeprecated>

            <CardDeprecated>
                <DonutChart
                    data={articleViewsByCategoriesData}
                    labels={categoryLabels}
                    title={t('Перегляди статей за категоріями, %')}
                    legendPosition="bottom"
                />
            </CardDeprecated>
        </HStack>
    );
};
