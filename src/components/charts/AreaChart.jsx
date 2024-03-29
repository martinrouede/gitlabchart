import { Chart } from 'react-google-charts';

import { useTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const AreaChart = (props) => {

    const theme = useTheme();

    return (
        <Chart
            width='100%'
            height='400px'
            chartType='AreaChart'
            loader={<LinearProgress />}
            data={props.data}
            options={{
                isStacked: true,
                title: 'Cumulative Flow Chart',
                titleTextStyle: { color: theme.palette.text.primary },
                backgroundColor: theme.palette.background.default,
                lineWidth: 2,
                colors: props.colors,
                hAxis: {
                    title: 'Sprint Days',
                    titleTextStyle: { color: theme.palette.text.primary },
                    textStyle: { color: theme.palette.text.primary },
                    gridlines: { color: theme.palette.text.secondary, count: props.data.length },
                    baselineColor: { color: theme.palette.text.primary },
                    minValue: 0,
                },
                vAxis: {
                    title: 'Amount of Issues',
                    titleTextStyle: { color: theme.palette.text.primary },
                    textStyle: { color: theme.palette.text.primary },
                    gridlines: { color: theme.palette.text.secondary },
                    baselineColor: { color: theme.palette.text.primary },
                    minValue: 0
                },
                legend: {
                    textStyle: { color: theme.palette.text.primary }
                }
            }}
            rootProps={{ 'data-testid': '3' }}
        />
    );
}
export default AreaChart;
