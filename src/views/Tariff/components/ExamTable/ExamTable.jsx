import React from 'react';
//import PropTypes from 'prop-types';
//import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  Button,
} from '@material-ui/core';

import {
  Science as ScienceIcon
} from "../../../../assets/icons";
import validator from '../../../../common/validators'


/*************REDUX **********************/

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../../store/Atencion";
/*************REDUX *********************/


import { PreAnalitica } from "../../components";
import { TableHeader as TableHeaderView } from "./components";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 400,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  tableRowText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px'
    }
  },
  textCenter: {
    textAlign: 'center',
    fontWeight: 500,
    margin: theme.spacing(3),
    fontSize: '16px'
  },
}));

const ExmTable = ({ /*groupSelect,*/ data, tableSelect = false, setSelectServices, setPreviewTicket, atencion }) => {

  const classes = useStyles();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('servicio');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows = data.map(s => {
    return ({
      codigo: s.id,
      servicio: s.descripcion,
      precio: validator.MontoPENDecimal(s.precio),
      // icon: <PreAnalitica codigo={s.codigo} grupo={groupSelect.idGrupo} />
    })
  })



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
    handleChangeSelectService(name)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangeSelectService = (id) => {
    const existItem = atencion.listServicesSelect.servicesSelect.length > 0 ? atencion.listServicesSelect.servicesSelect.find(item => item.id === id) : false
    if (existItem) {
      //Se elimina el elemento/servicio
      const newItemsSelected = []
      atencion.listServicesSelect.servicesSelect.forEach(s => {
        if (s.id !== id) newItemsSelected.push(s)
      })
      setSelectServices(newItemsSelected)
    }
    else {
      //Se agrega el elemento
      const itemSelect = data.find(item => item.id === id)
      const newItemsSelected = atencion.listServicesSelect.servicesSelect.length > 0 ? [
        ...atencion.listServicesSelect.servicesSelect,
        itemSelect
      ] : [itemSelect]
      setSelectServices(newItemsSelected)
    }

  }
  React.useEffect(() => {
    if (atencion.listServicesSelect.servicesSelect.length > 0)
      setSelected(atencion.listServicesSelect.servicesSelect.map(item => item.id));
    else
      setSelected([])
  }, [atencion.listServicesSelect.servicesSelect])
  return (
    <div className={classes.root}>
      {
        rows
          ?
          rows.length > 0
            ?
            <Paper className={classes.paper}>
              <div className={classes.sectionTitleTable}>
                {
                  selected.length > 0 &&
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<VisibilityIcon />}
                    onClick={() => setPreviewTicket(true)}
                  >
                    Ver {selected.length} Seleccionados
                  </Button>
                }
              </div>

              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={'medium'}
                  aria-label="enhanced table"
                >
                  <TableHeaderView
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />

                  <TableBody >
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.codigo);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.codigo}
                            selected={isItemSelected}
                          >
                            {
                              tableSelect ?

                                <TableCell padding="checkbox" onClick={(event) => handleClick(event, row.codigo)}>
                                  <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    color="primary"
                                  />
                                </TableCell>
                                :
                                <TableCell >
                                  <ScienceIcon />
                                </TableCell>
                            }
                            <TableCell component="th" id={labelId} scope="row" padding="none" align='center' className={classes.tableRowText}>
                              {row.codigo}
                            </TableCell>
                            <TableCell className={classes.tableRowText} padding='none'>{row.servicio}</TableCell>
                            <TableCell align="right" padding='none' className={classes.tableRowText}>{row.precio}</TableCell>
                            <TableCell align="right" padding='none' >{row.icon}</TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
            : <div className={classes.textCenter}>"Servicio no encontrado"</div>
          : <div className={classes.textCenter}>"Cargando...."</div>
      }
    </div>
  );
}


const mapStateToProps = state => ({
  atencion: state.atencion,
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ExmTable)
