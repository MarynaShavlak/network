import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { RadialbarChart } from '@/shared/ui/common/Charts/ui/RadialbarChart';
import { UsersActivityChartProps } from '../../../model/types/types';
import { useActiveUsersChartData } from '../../../lib/hooks/useActiveUsersChartData';

export const UsersActivityChartRedesigned = memo(
    (props: UsersActivityChartProps) => {
        const { t } = useTranslation('admin');
        const { activeUsersList, totalUsers, className, width, height } = props;
        console.log('activeUsersList', activeUsersList);
        console.log('totalUsers', totalUsers);
        const activeUsersData = useActiveUsersChartData(
            activeUsersList,
            totalUsers,
        );
        console.log('__', activeUsersList, totalUsers);
        const activeUserLabels = [
            `${t('Автори статей')}`,
            `${t('Коментатори статей')}`,
            `${t('Оцінка статей')}`,
        ];
        console.log('activeUsersData', activeUsersData);
        return (
            <Card className={className}>
                <RadialbarChart
                    data={activeUsersData}
                    labels={activeUserLabels}
                    title={t('Відсоток активних користувачів, %')}
                    legendPosition="top"
                    height={height}
                    width={width}
                />
            </Card>
        );
    },
);
