import React from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

import { useBaseChartOptions } from '../../lib/hooks/useBaseChartOptions/useBaseChartOptions';
import { mergeOptions } from '../../lib/utilities/mergeOptions/mergeOptions';
import { BaseChartProps } from '../types';

interface DonutChartProps extends BaseChartProps {
    data: number[];
}

export const DonutChart = (props: DonutChartProps) => {
    const {
        data,
        labels,
        title,
        legendPosition = 'right',
        width = '300',
        height = '300',
    } = props;

    const baseChartOptions = useBaseChartOptions({
        title,
        legendPosition,
        width,
    });

    const additionalOptions: ApexCharts.ApexOptions = {
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.15,
                },
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: 'darken',
                    value: 0.35,
                },
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '45%',
                },
            },
        },
        labels,
    };

    const chartOptions = mergeOptions(baseChartOptions, additionalOptions);

    return (
        <ReactApexChart
            series={data}
            type="donut"
            width={width}
            height={height}
            options={chartOptions}
        />
    );
};
