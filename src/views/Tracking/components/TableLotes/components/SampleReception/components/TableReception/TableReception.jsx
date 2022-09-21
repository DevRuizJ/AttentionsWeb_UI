import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

/*************REDUX **********************/
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "store/Attention";

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
/*************REDUX **********************/

const useRowStyles = makeStyles(theme=>({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  success:{
    color:theme.palette.success.main
  },
  error:{
    color:theme.palette.warning.dark
  }
}));


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.ticket}
        </TableCell>
        <TableCell>{row.paciente}</TableCell>
        <TableCell align="right">{row.fecha}</TableCell>
        <TableCell align="right">{`${row.Escaneado}/${row.totalMuestra}`}</TableCell>
        <TableCell align="right">
          {row.Escaneado===row.totalMuestra&&<CheckCircleIcon className={classes.success} />}
        </TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
              LISTA DE MUESTRAS
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>CÓDIGO</TableCell>
                    <TableCell>MUESTRA</TableCell>
                    <TableCell>ESCANEO</TableCell>
                    <TableCell align="center">ESTADO</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow,index) => (
                    <TableRow key={historyRow.codigo+"-"+index}>
                      <TableCell component="th" scope="row">
                        {`${historyRow.nroorden}-${historyRow.codigo}`}
                      </TableCell>
                      <TableCell>{historyRow.descripcion}</TableCell>
                      <TableCell>{historyRow.fechaEscaneo}</TableCell>
                      <TableCell align="center">
                        {historyRow.fechaEscaneo.length?<CheckCircleIcon className={classes.success} />:<CancelIcon className={classes.error} />}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function uniqueObj(arr){
  let arrUnique = []
  arr.forEach(v=>{
    const itemfind =arrUnique.find(m=>m.codigo===v.codigo)
    if(!itemfind) arrUnique.push(v)
  })
  return arrUnique
}


const TableReception = ({attention})=> {

  const rows = attention.loteAtenciones.map(e=>{
    const muestras = uniqueObj(e.muestras)
    return {
      ticket: e.ticket,
      yearOrden: e.orden,
      paciente: e.paciente,
      fecha: e.fechaAtencion,
      totalMuestra: muestras.length,
      Escaneado:muestras.filter(m=>m.fechaEscaneo.length>0).length,
      history: muestras
    }
  })
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>TICKET</TableCell>
            <TableCell align="right">PACIENTE</TableCell>
            <TableCell align="right">FECHA</TableCell>
            <TableCell align="right">ESTADO</TableCell> 
            <TableCell align="right"></TableCell>           

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.ticket} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = state => ({
  attention: state.attention,
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableReception)
