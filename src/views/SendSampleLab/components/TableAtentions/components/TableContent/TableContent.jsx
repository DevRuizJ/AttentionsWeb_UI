import React from 'react';
//import PropTypes from 'prop-types';
//import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Checkbox,
  Button,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

import { 
  LoadingMessage
} from "../../../../../../components";
import validator from '../../../../../../common/validators'

import {  TableHeader as TableHeaderView } from "..";

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
    textAlign:'center'
  },
  tableRowText:{
    [theme.breakpoints.down('sm')]:{      
      fontSize:'12px'      
    }
  },
  ButtonTopTable:{
    textAlign:'end'
  },
  sectionTitleTable:{
    fontWeight:500,
    margin: theme.spacing(2,0),
    fontSize:'16px',
    color:theme.palette.warning.dark
  },
  tableHeader:{
    backgroundColor:theme.palette.secondary.main,
    '& *':{
      color:'#fff!important'
    }
  },
  textResumen:{
    width:120,
    textAlign:'end'
  },
  inline:{
    display:'flex',
  },
  boxResumen:{
    padding:theme.spacing(2)
  }
}));

const PaymentTableList = ({data,onConfirm})=> {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('ticket');
  const [selected, setSelected] = React.useState([]);
  const [servicesSelect, setSelectServices] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows= data.map(a =>{
    return({
      ticket:a.ticket,
      fecha:a.fechaAtencion,
      paciente:a.paciente,
      total:validator.MontoPENDecimal(a.total),
    })
    }
  )  

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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.ticket);
      setSelected(newSelecteds);
      setSelectServices(data)

      return;
    }
    setSelected([]);
    setSelectServices([])
  };

  const handleChangeSelectService = (id)=>{
    const existItem = servicesSelect.find(item=>item.ticket===id)
    if(existItem)
    {
      //Se elimina el elemento/servicio
      const newItemsSelected = []
      servicesSelect.forEach(s=>{
        if(s.ticket!==id) newItemsSelected.push(s)
      })
      setSelectServices(newItemsSelected)
    }
    else
    {
      //Se agrega el elemento
      const itemSelect = data.find(item=>item.ticket===id)
      if(itemSelect) {
        const newItemsSelected= servicesSelect.length>0?[
          ...servicesSelect,
          itemSelect
        ]:[itemSelect]
        setSelectServices(newItemsSelected)
      }
    }
  }

  return (
    <div className={classes.root}>
      {
        rows
          ?
          rows.length > 0
            ?
            <div className={classes.paper}>

              <div className={classes.ButtonTopTable}>
              {
                  selected.length > 0 &&
                  <Button 
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<LockIcon/>}
                    onClick={()=>onConfirm(servicesSelect)}
                  >
                    Generar Lote de {selected.length } Tickets
                  </Button>
                }
              </div>            
              <div className={classes.sectionTitleTable}>
                {rows.length} Tickets pendiente de envio.
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
                    onSelectAllClick={handleSelectAllClick}
                    rowCount={rows.length}
                  />

                  <TableBody >
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.ticket);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.ticket}
                            selected={isItemSelected}
                          >
                              

                            <TableCell padding="checkbox" onClick={(event) =>   handleClick(event, row.ticket)}>
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                                color="primary"
                              />
                            </TableCell>
                            <TableCell component="th" id={labelId} scope="row" padding="none" align='center' className={classes.tableRowText}>
                              {row.ticket}
                            </TableCell>
                            <TableCell className={classes.tableRowText} padding='none' align="center">{row.fecha}</TableCell>
                            <TableCell padding='none' className={classes.tableRowText}>{row.paciente}</TableCell>
                            <TableCell align="right" padding='none' >{row.total}</TableCell>
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
            </div>
            : <div className={classes.textCenter}>"Servicio no encontrado"</div>
          : <LoadingMessage message="Por favor expere, estamos obteniendo el listado de atenciones..."/>
      }
    </div>
  );
}
export default PaymentTableList
