import { Chart } from 'react-google-charts';

import { useTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import Styles from './Styles';

const ColumnChart = (props) => {

    const classes = Styles.useStyles();

    const theme = useTheme();

    return (
        <Chart
            width='100%'
            height='400px'
            chartType='ColumnChart'
            loader={<LinearProgress />}
            data={props.data}
            options={{
                title: 'Comparative Issues Chart',
                titleTextStyle: { color: theme.palette.text.primary },
                backgroundColor: theme.palette.background.default,
                hAxis: {
                    title: 'Issues',
                    titleTextStyle: { color: theme.palette.text.primary },
                    textStyle: { color: theme.palette.text.primary },
                    baselineColor: { color: theme.palette.text.primary },
                    minValue: 0
                },
                vAxis: {
                    title: 'Hours',
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
            rootProps={{ 'data-testid': '1' }}
        />
    );
}
export default ColumnChart;
