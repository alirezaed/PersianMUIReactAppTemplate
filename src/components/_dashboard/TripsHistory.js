import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

//
import { BaseOptionChart } from '../charts';

// ----------------------------------------------------------------------
TripsHistory.propTypes = {
  data: PropTypes.array
};
export default function TripsHistory({ data }) {
  const { t } = useTranslation();
  const chartData = [
    {
      name: t('NavganVehicles'),
      type: 'column',
      data: data.map((item) => item.ActiveVehicleCount)
    },
    {
      name: t('RideCount'),
      type: 'area',
      data: data.map((item) => item.RidedVehicleCount)
    },
    {
      name: t('RidedVehicle'),
      type: 'line',
      data: data.map((item) => item.UniqueRidedVehicleCount)
    }
  ];
  const dates = data.map((item) => item.Date);

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
      <CardHeader title={t('VehicleUsage')} subheader={t('LastMount')} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
