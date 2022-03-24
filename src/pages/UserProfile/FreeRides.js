import { t } from 'i18next';
import * as React from 'react';
import PropTypes from 'prop-types';
import TableEx from '../../components/TableEx/Table';
import Actions from '../../components/profile/Actions';

FreeRides.propTypes = {
  freeRides: PropTypes.array
};

export default function FreeRides({ freeRides }) {
  const columns = [
    { field: 'usage_date', label: t('UsageDate'), align: 'center', jalalDate: true },
    { field: 'status', label: t('Status'), align: 'center' },
    { field: 'expire_date', label: t('ExpireDate'), align: 'center', jalalDate: true },
    { field: 'ride_time', label: t('RideTime'), align: 'center' }
  ];

  return (
    <>
      <TableEx
        data={freeRides || []}
        columns={columns}
        keyField="id"
        totalCount={freeRides?.length || 0}
        loading={!freeRides}
      />
      <Actions returnButton />
    </>
  );
}
