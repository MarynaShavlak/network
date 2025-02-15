import { useChartStyles } from '../useChartStyles/useChartStyles';

interface BaseChartOptions {
    title?: string;
    legendPosition?: 'top' | 'right' | 'bottom' | 'left';
    width?: string | number;
    height?: string | number;
}

export const useBaseChartOptions = (props: BaseChartOptions) => {
    const { fontFamily, labelColor, monochromeColor, chartTheme } =
        useChartStyles();
    const {
        title,
        legendPosition = 'right',
        width = '100%',
        height = '100%',
    } = props;
    return {
        chart: {
            width,
            height,
            background: 'transparent',
            zoom: {
                enabled: false,
            },
        },
        stroke: {
            show: false,
        },
        grid: {
            show: false,
        },
        title: {
            text: title,
            align: 'left' as const,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily,
            },
        },
        legend: {
            fontFamily,
            onItemHover: {
                highlightDataSeries: true,
            },
            onItemClick: {
                toggleDataSeries: true,
            },
            position: legendPosition,
            offsetY: 60,
        },
        theme: {
            mode: chartTheme,
            monochrome: {
                enabled: true,
                color: monochromeColor,
                shadeTo: chartTheme,
                shadeIntensity: 0.9,
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                fontFamily,
                fontWeight: '600',
                colors: [labelColor],
            },
            dropShadow: {
                enabled: false,
            },
        },
        tooltip: {
            style: {
                fontSize: '12px',
                fontFamily,
            },
            onDatasetHover: {
                highlightDataSeries: false,
            },
        },
        xaxis: {
            type: 'category' as const,
            title: {
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    fontFamily,
                },
            },
        },
        yaxis: {
            show: true,
            title: {
                style: {
                    fontSize: '10px',
                    fontWeight: 'bold',
                    fontFamily,
                },
            },
            labels: {
                style: {
                    fontSize: '10px',
                    fontWeight: 'bold',
                    fontFamily,
                },
            },
        },
    };
};
