import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const redialBarChartOptions = {
    chart: {
        type: 'radialBar',
        width: 450,
        height: 450
    },
    plotOptions: {
        radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
                margin: 5,
                size: '30%',
                background: 'transparent',
                image: undefined
            },
            dataLabels: {
                name: {
                    show: false
                },
                value: {
                    show: false
                }
            }
        }
    },
    labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
    legend: {
        show: true,
        floating: true,
        fontSize: '1rem',
        position: 'left',
        offsetX: 0,
        offsetY: 15,
        labels: {
            useSeriesColors: true
        },
        markers: {
            size: 0
        },
        formatter(seriesName, opts) {
            return `${seriesName}:  ${opts.w.globals.series[opts.seriesIndex]}`;
        },
        itemMargin: {
            vertical: 3
        }
    },
    responsive: [
        {
            breakpoint: 450,
            chart: {
                width: 280,
                height: 280
            },
            options: {
                legend: {
                    show: false,
                    position: 'bottom'
                }
            }
        }
    ]
};

// ==============================|| RADIAL BAR CHART ||============================== //

const ApexRedialBarChart = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const { navType } = customization;
    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];

    const [series] = useState([76, 67, 61, 90]);
    const [options, setOptions] = useState(redialBarChartOptions);

    const secondary = theme.palette.secondary.main;
    const primaryMain = theme.palette.primary.main;
    const successDark = theme.palette.success.dark;
    const error = theme.palette.error.main;

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [secondary, primaryMain, successDark, error],
            xaxis: {
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [primary]
                    }
                }
            },
            grid: {
                borderColor: navType === 'dark' ? darkLight + 20 : grey200
            },
            plotOptions: {
                radialBar: {
                    track: {
                        background: navType === 'dark' ? darkLight + 20 : grey200
                    }
                }
            }
        }));
    }, [navType, primary, darkLight, grey200, secondary, primaryMain, successDark, error]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="radialBar" />
        </div>
    );
};

export default ApexRedialBarChart;
