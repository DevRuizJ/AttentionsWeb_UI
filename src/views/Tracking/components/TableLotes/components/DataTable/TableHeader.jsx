import React from 'react';
import PropTypes from 'prop-types';

import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';

const TableHeader=(props) =>{
  const { classes, order, orderBy,  onRequestSort } = props;
  const headCells = [
    { id: 'lote', disablePadding: true, label: 'LOTE' },
    { id: 'fecha', aling: 'center',disablePadding: true, label: 'FECHA' },
    { id: 'tickets', aling: 'center', disablePadding: true, label: 'TICKETS' },
    { id: 'atencion', aling: 'center', disablePadding: false, label: 'ATENCIONES' },
    { id: 'reporte', aling: 'center', disablePadding: false, label: 'REPORTE' },
  ];
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="default"/>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.aling}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

TableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default TableHeader
