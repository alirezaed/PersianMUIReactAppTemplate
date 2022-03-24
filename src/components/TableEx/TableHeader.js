import PropTypes from 'prop-types';
// material
import { visuallyHidden } from '@mui/utils';
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------

TableHeader.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  columns: PropTypes.array,
  onRequestSort: PropTypes.func,
  serverSide: PropTypes.bool
};

export default function TableHeader({ order, orderBy, columns, onRequestSort, serverSide }) {
  const createSortHandler = (property, sortable) => (event) => {
    if (!serverSide || sortable) {
      onRequestSort(event, property);
    }
  };

  const getStyle = (col) => {
    if (col.width) {
      return {
        width: `${col.width}%`
      };
    }
    return undefined;
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.field}
            align={headCell.align}
            sortDirection={orderBy === headCell.field ? order : false}
            style={getStyle(headCell)}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.field}
              direction={orderBy === headCell.field ? order : 'asc'}
              onClick={createSortHandler(headCell.field, headCell.sortable)}
              style={{ cursor: !serverSide || headCell.sortable ? 'pointer' : 'unset' }}
            >
              {headCell.label}
              {orderBy === headCell.field ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
