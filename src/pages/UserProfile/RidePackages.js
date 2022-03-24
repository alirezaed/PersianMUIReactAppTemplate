import { t } from 'i18next';
import * as React from 'react';
import PropTypes from 'prop-types';
import TableEx from '../../components/TableEx/Table';
import Actions from '../../components/profile/Actions';

RidePackages.propTypes = {
  ridePackages: PropTypes.array
};

export default function RidePackages({ ridePackages }) {
  const columns = [
    { field: 'name', label: t('Title'), align: 'center' },
    { field: 'start_date', label: t('StartDate'), align: 'center', jalalDate: true },
    { field: 'end_date', label: t('EndDate'), align: 'center' },
    { field: 'status', label: t('Status'), align: 'center' },
    { field: 'ride_time', label: t('RideTime'), align: 'center' }
  ];

  return (
    <>
      <TableEx
        data={ridePackages || []}
        columns={columns}
        keyField="id"
        totalCount={ridePackages?.length || 0}
        loading={!ridePackages}
      />
      <Actions returnButton />
    </>
  );
}
