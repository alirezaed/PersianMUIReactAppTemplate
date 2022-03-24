import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination
} from '@mui/material';
import { format } from 'date-fns-jalali';
import { Icon } from '@iconify/react';
import checkmark from '@iconify/icons-eva/checkmark-circle-fill';
import Scrollbar from '../Scrollbar';
import SearchNotFound from '../SearchNotFound';
import MoreMenu from './MoreMenu';
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';
import PageLoading from '../PageLoading';
import { enums } from '../../common/enumerations';

TableEx.propTypes = {
  data: PropTypes.array,
  totalCount: PropTypes.number,
  columns: PropTypes.array,
  moreActions: PropTypes.array,
  keyField: PropTypes.string,
  defaultSortField: PropTypes.string,
  defaultSortOrder: PropTypes.oneOf(['asc', 'desc']),
  hasSearch: PropTypes.bool,
  loading: PropTypes.bool,
  getRowStyle: PropTypes.func,
  onRefresh: PropTypes.func
};

export default function TableEx({
  data,
  totalCount,
  columns,
  keyField,
  moreActions,
  hasSearch,
  defaultSortField,
  defaultSortOrder,
  loading,
  getRowStyle,
  onRefresh
}) {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState(defaultSortOrder || 'asc');
  const [orderBy, setOrderBy] = useState(defaultSortField || keyField);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (onRefresh) {
      onRefresh({ page, rowsPerPage, order, orderBy });
    }
  }, [page, rowsPerPage, order, orderBy, onRefresh]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const getData = () => {
    const sortFn = (a, b) => {
      let result = 0;
      if (a[orderBy] < b[orderBy]) result = 1;
      if (a[orderBy] > b[orderBy]) result = -1;
      return result * (order === 'asc' ? 1 : -1);
    };

    const filterPageFn = (item, index) =>
      index >= page * rowsPerPage && index < (page + 1) * rowsPerPage;

    const filterText = (item) =>
      !hasSearch || !filterName || JSON.stringify(item).includes(filterName);
    return onRefresh ? data : data.sort(sortFn).filter(filterText).filter(filterPageFn);
  };

  const handleDoubleClick = (row) => {
    if (moreActions && moreActions.length > 0) {
      moreActions[0].clickHandler(row);
    }
  };

  const isDataNotFound = data.length === 0;
  const getCellValue = (col, val) => {
    if (col.jalalDate) {
      return val ? format(Date.parse(val), 'hh:mm:ss yyyy/MM/dd') : '';
    }
    if (col.enumName) {
      return t(enums[col.enumName][val]) || '';
    }
    return val === true ? <Icon color="green" icon={checkmark} /> : val;
  };

  return (
    <Card>
      {hasSearch && <TableToolbar filterName={filterName} onFilterName={handleFilterByName} />}
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHeader
              order={order}
              orderBy={orderBy}
              columns={columns}
              onRequestSort={handleRequestSort}
              serverSide={!!onRefresh}
            />
            <TableBody>
              {getData().map((row) => (
                <TableRow
                  hover
                  key={row[keyField]}
                  tabIndex={-1}
                  onDoubleClick={() => handleDoubleClick(row)}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.field}
                      align={col.align}
                      style={getRowStyle && { ...getRowStyle(row) }}
                    >
                      {getCellValue(col, row[col.field])}
                    </TableCell>
                  ))}
                  {moreActions && (
                    <TableCell align="right">
                      <MoreMenu moreActions={moreActions} row={row} />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
            {isDataNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={columns.length} sx={{ py: 3 }}>
                    {!loading && (
                      <SearchNotFound
                        searchQuery={filterName}
                        style={{ height: '200px', display: 'flex' }}
                      />
                    )}
                    {loading && <PageLoading />}
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={t('RowsPerPage')}
        labelDisplayedRows={({ from, to, count }) => `
      ${t('From')} ${from} ${t('To')} ${to} - ${t('TotalCount')} ${count}`}
      />
    </Card>
  );
}
