import { t } from 'i18next';
import * as React from 'react';
import PropTypes from 'prop-types';
import TableEx from '../../components/TableEx/Table';
import Actions from '../../components/profile/Actions';

Transactions.propTypes = {
  transactions: PropTypes.array
};

export default function Transactions({ transactions }) {
  const columns = [
    { field: 'create_date', label: t('CreateDate'), align: 'center', jalalDate: true },
    { field: 'type', label: t('Type'), align: 'center' },
    { field: 'total_amount', label: t('TotalAmount'), align: 'center' },
    { field: 'description', label: t('Description'), align: 'center' }
  ];

  return (
    <>
      <TableEx
        data={transactions || []}
        columns={columns}
        keyField="create_date"
        totalCount={transactions?.length || 0}
        loading={!transactions}
      />
      <Actions returnButton />
    </>
  );
}
