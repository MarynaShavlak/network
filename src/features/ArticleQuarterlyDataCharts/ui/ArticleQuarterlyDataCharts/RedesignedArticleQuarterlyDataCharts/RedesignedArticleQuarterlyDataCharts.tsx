import React from 'react';
import { useTranslation } from 'react-i18next';
import { StackedColumnsChart } from '@/shared/ui/common/Charts/ui/StackedColumnsChart';
import { useArticlePeriodData } from '../../../lib/hooks/useArticleQuarterlyData/useArticlePeriodData';
import { VStack } from '@/shared/ui/common/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticlePeriodDataChartsProps } from '../ArticlePeriodDataCharts';
import { LineChart } from '@/shared/ui/common/Charts/ui/LineChart';

export const RedesignedArticleQuarterlyDataCharts = (
    props: ArticlePeriodDataChartsProps,
) => {
    const { t } = useTranslation('admin');
    const { labels, categories, data } = props;

    const {
        quarterlyCategoryData,
        quarterlyLabels,
        monthlyLabels,
        monthlyCategoryData,
    } = useArticlePeriodData(categories, data);
    // const { periodLabels, chartData } = useArticlePeriodData({});
    // const { chartData: accumulatedChartData } = useArticlePeriodData({
    //     isAccumulated: true,
    // });

    // console.log('periodLabels', periodLabels);
    // console.log('chartData', chartData);
    // console.log('accumulatedChartData', accumulatedChartData);

    return (
        <VStack gap="16">
            <Card>
                <StackedColumnsChart
                    data={quarterlyCategoryData}
                    labels={quarterlyLabels}
                    title={t(
                        'Розподіл кількості опублікованих статей за категоріями по кварталах',
                    )}
                    legendPosition="top"
                    xAxisTitle={t('Квартал')}
                    yAxisTitle={t('Кількість статей')}
                    height="300"
                    width="800"
                />
            </Card>
            <Card>
                <LineChart
                    data={monthlyCategoryData}
                    labels={monthlyLabels}
                    title={t(
                        'Динаміка зростання кількості статей за категоріями',
                    )}
                    legendPosition="top"
                    xAxisTitle={t('Місяць')}
                    yAxisTitle={t('Кількість статей')}
                    height="300"
                    width="800"
                />
            </Card>
        </VStack>
    );
};
