
import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  Typography,
  TableCell,
  TableBody,
  Table,
  TableRow,
  IconButton,
  Collapse,
  Box,
  TableHead,
  Tooltip,
  TableContainer,
  Paper
}
  from '@material-ui/core';

import Slide from '@material-ui/core/Slide';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import HowToRegIcon from '@material-ui/icons/HowToReg';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../../../store/Paciente';
import { actionCreators as actionCreatorsCompania } from '../../../../store/Compania';
import { actionCreators as actionCreatorsAtencion } from '../../../../store/Atencion';

import {
  AtentionRegister
} from "../../components";
import { CenterFocusStrongOutlined, TurnedInTwoTone } from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(3)
  },
  dialog: {
    minWith: "500px"
  },
  appBar: {
    position: 'relative',
  },
  title2: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    flex: 1,
  },
  headColorTable: {
    backgroundColor: theme.palette.secondary.dark,
    "& *": {
      color: theme.palette.background.paper,
    },
  },
}));

const useRowStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  tableRow: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  headColorTable: {
    backgroundColor: theme.palette.secondary.dark,
    "& *": {
      color: theme.palette.background.paper,
    },
  },
  headColorColapseTable: {
    backgroundColor: theme.palette.secondary.main,
    "& *": {
      color: theme.palette.background.paper,
    },
  },

  title: {
    margin: theme.spacing(2, 0),
  },
  mensajeAlerta: {
    color: theme.palette.warning.dark,
    textAlign: 'center',
    margin: theme.spacing(2)
  }
}));


function RowDetails(props) {
  const { rowDetail, guardarDataIafas, onClose } = props;
  const classes = useRowStyles();

  const selectAfiliado = (param) => {

    const parametro = {
      "tipoDocumento": "1",
      "numeroDocumento": param.numeroDocumento.trim(),
      "nombre": param.nombres,
      "apellidoPaterno": param.apellidoPaterno,
      "apellidoMaterno": param.apellidoMaterno == " " ? "-" : param.apellidoMaterno,
      "sexo": param.sexo == "MASCULINO" ? "M" : "F",
      "fechaNacimiento": getFechaNac(param.fechaNacimiento),
      "email": "NO@gmail.com",
      "tarifaIpress": param.tarifaIpress,
      "tarifaDisamar": param.tarifaDisamar
    }

    guardarDataIafas(parametro);
    onClose(null);
  }

  const getFechaNac = (fecha) => {
    var fecNac = fecha.split('/');
    var myDate = new Date(fecNac[2], fecNac[1] - 1, fecNac[0]);

    return myDate.toLocaleDateString('en-GB');
  }

  return (
    <>
      <Table size="small" aria-label="purchases">

        <TableHead className={classes.headColorColapseTable}>

          <TableRow>
            <TableCell align="center">N° DE HISTORIA</TableCell>
            <TableCell align="center">PARENTESCO</TableCell>
            <TableCell align="center">N° DE DOCUMENTO</TableCell>
            <TableCell align="center">NOMBRES COMPLETOS</TableCell>
            <TableCell align="center">EDAD</TableCell>
            <TableCell align="center">SEXO</TableCell>
            <TableCell align="center">TARIFA COBERTURA IAFAS</TableCell>
            <TableCell align="center">TARIFA COBERTURA DISAMAR</TableCell>
            <TableCell align="center">ACCIÓN</TableCell>
          </TableRow>

        </TableHead>

        <TableBody>
          {rowDetail.map((rowD) => (
            <TableRow key={rowD.numeroHistoria}>
              <TableCell align="right" component="th" scope="row">
                {rowD.numeroHistoria}
              </TableCell>
              <TableCell align="center">
                {rowD.parentesco}
              </TableCell>
              <TableCell align="right">
                {rowD.numeroDocumento.trim()}
              </TableCell>
              <TableCell align="left">
                {rowD.pacienteAfiliado}
              </TableCell>
              <TableCell align="center">
                {rowD.edad}
              </TableCell>
              <TableCell align="center">
                {rowD.sexo}
              </TableCell>
              <TableCell align="center">
                {rowD.tarifaIpress}%
              </TableCell>
              <TableCell align="center">
                {rowD.tarifaDisamar}%
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                <Tooltip title="Seleccionar afiliado">
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    color="primary"
                    onClick={() => selectAfiliado(rowD)}
                  >
                    <HowToRegIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </>
  );
}

function Row(props) {
  const classes = useRowStyles();
  const { row, rowDetail, setOpenRow, onDelete, itemSelect, companiaSeleccionada, onClose, guardarDataIafas } = props;
  const [dataIafas, setDataIafas] = useState(null);

  const selectAfiliado = (param) => {
    const parametro = {
      "tipoDocumento": "1",
      "numeroDocumento": param.numeroDocumento.trim(),
      "nombre": param.nombres,
      "apellidoPaterno": param.apellidoPaterno,
      "apellidoMaterno": param.apellidoMaterno == " " ? "-" : param.apellidoMaterno,
      "sexo": param.sexo == "MASCULINO" ? "M" : "F",
      "fechaNacimiento": getFechaNac(param.fechaNacimiento),
      "email": "NO@gmail.com",
      "tarifaIpress": param.tarifaIpress,
      "tarifaDisamar": param.tarifaDisamar
    }

    guardarDataIafas(parametro);
    onClose(null);
  }

  const getFechaNac = (fecha) => {
    var fecNac = fecha.split('/');
    var myDate = new Date(fecNac[2], fecNac[1] - 1, fecNac[0]);

    return myDate.toLocaleDateString('en-GB');
  }

  return (
    <>
      <TableRow className={classes.tableRow} >
        <TableCell align="center" style={{ width: 30 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => { setOpenRow(row.numeroHistoria) }}
          >
            {row.numeroHistoria === itemSelect ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="right" style={{ width: 110 }}>
          {row.numeroHistoria}
        </TableCell>
        <TableCell align="center">{row.parentesco}</TableCell>
        <TableCell align="right">{row.numeroDocumento.trim()}</TableCell>
        <TableCell align="left">{row.pacienteAfiliado}</TableCell>
        <TableCell align="center">{row.fechaNacimiento}</TableCell>
        <TableCell align="center">{row.edad}</TableCell>
        <TableCell align="center">{row.situacion}</TableCell>
        <TableCell align="center">{row.tarifaIpress}%</TableCell>
        <TableCell align="center">{row.tarifaDisamar}%</TableCell>
        <TableCell align="center">
          <Tooltip title="Seleccionar afiliado">
            <IconButton aria-label="delete" color="primary" onClick={() => selectAfiliado(row)}>
              <HowToRegIcon />
            </IconButton>
          </Tooltip>
        </TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={row.numeroHistoria === itemSelect} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {"LISTA DE FAMILIARES"}
              </Typography>
              {row.numeroHistoria === itemSelect && <RowDetails rowDetail={rowDetail} onDelete={onDelete} guardarDataIafas={guardarDataIafas} onClose={onClose}/>}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {
        dataIafas &&
        <AtentionRegister onClose={null} dataIafas={dataIafas} />
      }
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    numeroHistoria: PropTypes.string.isRequired,
    numeroDocumento: PropTypes.string.isRequired,
    apellidoPaterno: PropTypes.string.isRequired,
    nombres: PropTypes.number.isRequired,
  }).isRequired,
};

const PacienteIafas = props => {
  
  const { onClose, afiliadosData, selectPaciente, EstadoPacienteAptitud, paciente, getListAptitudCompania, compania, guardarDataIafas, newPatientNavalDefault, openPopup = true } = props
  
  const classes = useStyles();
  const [rows, setRows] = useState([])
  const [rowsDetail, setRowsDetail] = useState([])
  //Desplega la lista de Familiares de la Tabla del Afiliado
  const [idRowOpen, setIdRowOpen] = useState(null)

  const [open, setOpen] = useState(true);

  //DIALOG
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('xl');

  //Obtener la lista de FAMILIARES del AFILIADO  --
  const handleSelectRow = (ticket) => {
    idRowOpen && idRowOpen == ticket ? setIdRowOpen(null) : setIdRowOpen(ticket)
  }

  useEffect(() => {

    let rowsAfiliados = [];

    if (afiliadosData.apellidoPaterno.length >= 0) {

      rowsAfiliados.push(afiliadosData)
      setRows(rowsAfiliados)
    }

    setRowsDetail(afiliadosData.familiares) //llenar tabla detalle

  }, [afiliadosData])

  const handleClose = () => {
    openPopup(false);
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, [openPopup])

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >

        <DialogTitle>{"DATOS DEL PACIENTE AFILIADO"}</DialogTitle>

        <DialogContent style={{ alignSelf: "center" }}>
          <Grid container spacing={2} style={{ width: '100%', minWidth: '500px', Height: '100%' }}>
            {
              rows.numeroHistoria = "0079728500" // > 0
              &&
              <div>

                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead className={classes.headColorTable}>
                      <TableRow>
                        <TableCell align="center">FAMILIARES</TableCell>
                        <TableCell align="center">NUMERO DE HISTORIA</TableCell>
                        <TableCell align="center">PARENTESCO</TableCell>
                        <TableCell align="center">N° DOCUMENTO</TableCell>
                        <TableCell align="center">APELLIDOS Y NOMBRES</TableCell>
                        <TableCell align="center">FECHA DE NACIMIENTO</TableCell>
                        <TableCell align="center">EDAD</TableCell>
                        <TableCell align="center">SITUACIÓN</TableCell>
                        <TableCell align="center">TARIFA COBERTURA IAFAS</TableCell>
                        <TableCell align="center">TARIFA COBERTURA DISAMAR</TableCell>
                        <TableCell align="center">ACCION</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        rows.map((row, index) => (
                          <Row
                            key={index}
                            row={row}
                            rowDetail={rowsDetail}
                            itemSelect={idRowOpen}
                            setOpenRow={handleSelectRow}
                            onClose={onClose}
                            guardarDataIafas={guardarDataIafas}
                          />
                        ))

                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            }
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>CANCELAR</Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}

const mapStateToProps = state => ({
  paciente: state.paciente,
  compania: state.compania,
  atencion: state.atencion,
})

const mapDispatch = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
      ...actionCreatorsCompania,
      ...actionCreatorsAtencion,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatch)(PacienteIafas);