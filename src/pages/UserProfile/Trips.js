import { t } from 'i18next';
import * as React from 'react';
import PropTypes from 'prop-types';
import TableEx from '../../components/TableEx/Table';
import Actions from '../../components/profile/Actions';

Trips.propTypes = {
  trips: PropTypes.array
};

export default function Trips({ trips }) {
  const columns = [
    { field: 'create_date', label: t('Date'), align: 'center', jalalDate: true },
    { field: 'vehicle_title', label: t('VehicleTitle'), align: 'center' },
    { field: 'active_minutes', label: t('ActiveMinutes'), align: 'center' },
    { field: 'pause_minutes', label: t('PauseMinutes'), align: 'center' },
    { field: 'distance', label: t('Distance'), align: 'center' },
    { field: 'price', label: t('Price'), align: 'center' },
    { field: 'status', label: t('Status'), align: 'center' }
  ];

  const getData = () =>
    trips.map((trip) => ({
      ...trip,
      vehicle_title: `${t(trip.vehicle.type)} : ${trip.vehicle.name}`
    }));

  return (
    <>
      <TableEx
        data={getData()}
        columns={columns}
        keyField="create_date"
        totalCount={trips?.length || 0}
        loading={!trips}
      />
      <Actions returnButton />
    </>
  );
}
