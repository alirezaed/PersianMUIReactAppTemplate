import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

//
import { BaseOptionChart } from '../charts';

// ----------------------------------------------------------------------
UserStatusHistory.propTypes = {
  data: PropTypes.array
};
export default function UserStatusHistory({ data }) {
  const { t } = useTranslation();

  const distinct = data
    .map((c) => c.UserStatus)
    .filter((value, index, self) => self.indexOf(value) === index);
  const chartData = distinct.map((item) => ({
    name: t(item),
    type: 'line',
    data: data.filter((c) => c.UserStatus === item).map((c) => c.Count)
  }));

  const dates = data
    .map((item) => item.Date)
    .filter((value, index, self) => self.indexOf(value) === index);

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: dates,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)}`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title={t('UserStatuses')} subheader={t('LastMount')} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
