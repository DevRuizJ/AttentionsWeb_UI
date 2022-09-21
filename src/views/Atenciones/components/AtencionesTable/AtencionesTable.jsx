import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  TableCell,
  TableBody,
  Table,
  IconButton,
  Collapse,
  Box,
  makeStyles,
  Tooltip,
  DialogContent,
  Dialog,
} from '@material-ui/core';

import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
/*************REDUX **********************/

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../../store/Atencion";
import { actionCreators as actionCreatorsUser } from "../../../../store/User";
/*************REDUX *********************/

import { ListExamenes as ListExamenesView } from '../../components';

import validator from '../../../../common/validators'
import { BotSuiza } from "assets/icons";
import { Attachment, Print, ViewWeek } from "@material-ui/icons";
import { PdfViewer } from "components";
import PrintTicket from "../PrintTicket";
import PrintBarCode from "../PrintBarCode";
import TicketEdition from "../TicketEdition";
import AttachMedicalOrder from "../AttachMedicalOrder";
import GetDataServer from "common/GetDataServer";
import { URLAPI } from "common/VariableGlobal";
import data from "views/Payment/data";
import Load from "../Load";

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
  const { rowDetail, onDelete } = props;
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <Table size="small" aria-label="purchases">
        <TableHead className={classes.headColorColapseTable}>
          <TableRow>
            <TableCell align="center">Codigo</TableCell>
            <TableCell align="center">Exámen</TableCell>
            {/* <TableCell align="center">Precio</TableCell> */}
            <TableCell align="center">Total Dolares</TableCell>
            <TableCell align="center">Total Soles</TableCell>
            {/* <TableCell align="center">Acción</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowDetail.map((rowD) => (
            <TableRow key={rowD.seekcia}>
              <TableCell align="center" component="th" scope="row">
                {rowD.seekcia}
              </TableCell>
              <TableCell align="center">{rowD.descripcion}</TableCell>
              {/* <TableCell align="center">
                {validator.MontoPENDecimal(rowD.precio)}
              </TableCell> */}
              <TableCell align="center">
                {validator.MontoUSDDecimal(rowD.totalDol)}
              </TableCell>
              <TableCell align="center">
                {validator.MontoPENDecimal(rowD.totalSol)}
              </TableCell>
              {/* <TableCell align="center" component="th" scope="row">
                <Tooltip title="Eliminar">
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    color="primary"
                    onClick={() => onDelete(rowD.numser)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

function Row(props) {

  const classes = useRowStyles();

  const { row, rowDetail, setOpenRow, onDelete, itemSelect, onDeleteTicket, onPrintTicket, onPrintBarCode, onAttachMedicalOrder, onEditTicket } = props;



  return (
    <React.Fragment>
      <TableRow className={classes.tableRow} >
        <TableCell style={{ width: 30 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => { setOpenRow(row.ticket) }}
          >
            {row.ticket === itemSelect ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center" style={{ width: 110 }}>
          {row.ticket}
        </TableCell>
        <TableCell align="center">
          <Tooltip title="Imprimir Ticket">
            <IconButton>
              <Print aria-label="ticket" color="primary" onClick={() => onPrintTicket(row.ticket)}></Print>
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell align="center">
          <Tooltip title="Imprimir Código de Barras">
            <IconButton>
              <ViewWeek aria-label="barCode" color="primary" onClick={() => onPrintBarCode(row.ticket)}></ViewWeek>
            </IconButton>
          </Tooltip>
        </TableCell>
        {/* <TableCell align="center">
          <Tooltip title="Adjuntar Ordén Médica">
            <IconButton>
              <Attachment aria-label="medicalOrder" color="primary" onClick={() => onAttachMedicalOrder(row.ticket)}></Attachment>
            </IconButton>
          </Tooltip>
        </TableCell> */}
        <TableCell align="center">{row.fechaAtencion}</TableCell>
        <TableCell align="center">{row.horaAtencion}</TableCell>
        <TableCell align="left">{row.paciente}</TableCell>
        <TableCell align="center">{row.tipoDoc}</TableCell>
        <TableCell align="center">{row.pacienteDoc}</TableCell>
        <TableCell align="center">{validator.MontoPENDecimal(row.totalSol)}</TableCell>
        <TableCell align="center">{validator.MontoUSDDecimal(row.totalDol)}</TableCell>
        {/* <TableCell align="center">{row.cobiafas}%</TableCell> */}
        {/* <TableCell align="center">{row.cobdisamar}%</TableCell> */}
        {/* <TableCell align="center">{validator.MontoPENDecimal(row.totalNaval)}</TableCell> */}
        {/* <TableCell align="center">
          <Tooltip title="Editar Ticket">
            <IconButton aria-label="edit" color="primary" onClick={() => onEditTicket(row.ticket)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </TableCell> */}

        {/* <TableCell align="center">
          <Tooltip title="Eliminar Ticket">
            <IconButton aria-label="delete" color="primary" onClick={() => onDeleteTicket(row.ticket)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={13}>
          <Collapse in={row.ticket === itemSelect} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                LISTA DE EXAMENES{" "}
              </Typography>
              {
                row.ticket === itemSelect && <RowDetails rowDetail={rowDetail} onDelete={onDelete} />
              }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    ticket: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    paciente: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};
const TableAtention = (props) => {

  const classes = useRowStyles();

  const { userCompany, dataAttentionList } = props;

  //store
  const { atencion, changeTicket, listarUnidadTicket, deleteRegister, actualizarUnidadTicket } = props;

  const [rows, setRows] = useState(dataAttentionList);

  const [rowsDetail, setRowsDetail] = useState([]);

  const [idRowOpen, setIdRowOpen] = useState(null);

  //Estado de control para ELIMINAR SERVICIO
  const [openDialog, setOpenDialog] = useState(false);

  //Estado de control para IMPRIMIR TICKET DE ATENCION
  const [printTicket, setPrintTicket] = useState(false);
  const [ticketArray, setTicketArray] = useState('');

  //Estado de control para IMPRIMIR CODIGO DE BARRA PARA MUESTRAS
  const [printBarCode, setPrintBarCode] = useState(false);
  const [ticketEdit, setTicketEdit] = useState(false);
  const [barCodeArray, setBarCodeArray] = useState('');

  //Estado de control para MOSTRAR PANTALLA DE CARGA
  const [loading, setLoading] = useState(false);

  //Estados de control para ADJUNTAR NUEVA ORDEN MEDICA
  const [attachMedOrder, setAttachMedOrder] = useState(false);

  //Estado de control para OBTENER EL TICKET SELECCIONADO
  const [ticketSelected, setTicketSelected] = useState('');

  //Estados de control para OBTENER IMAGEN ADJUNTA
  const [attached, setAttached] = useState({});

  const handleDeleteTicket = (ticket) => {
    const dataSelect = atencion.listAtentionGenerated.find(a => a.ticket === ticket);
    deleteRegister({
      "idOrden": dataSelect.numoscab,
      "periodo": dataSelect.peroscab,
      "anio": dataSelect.anooscab,
      "sucursal": dataSelect.numsuc,
      "empresa": dataSelect.numemp,
      "motivo": "SuizaNaval Anulacion Referencia"
    })
  }

  const handlePrintTicket = (ticket) => {
    setLoading(true);
    setTicketSelected(ticket);
    getAtentionTicket(ticket);
  }

  const getAtentionTicket = async (ticket) => {
    const dataSelect = atencion.dataListAttention.attentionList.find(a => a.header.ticket === ticket);
    const requestData = {
      // "Type": "naval",
      "OSNumber": dataSelect.header.numoscab,
      "Period": dataSelect.header.peroscab,
      "Year": dataSelect.header.anooscab,
      "BranchOffice": dataSelect.header.numsuc,
      "Company": "01"
    }

    await GetDataServer('post', URLAPI + "attention/" + "ticket", true, requestData)
      .then(data => {
        ticketArray.length > 0 ? setTicketArray('') : setTicketArray(data.ticketPdf);
        setLoading(false);
        setPrintTicket(true);
      })
      .catch(
      )
  }

  const handleEditTicket = (ticket) => {
    //setLoading(true);
    listarUnidadTicket({});
    setTicketEdit(true);

    const dataSelect = atencion.dataListAttention.attentionList.find(a => a.header.ticket === ticket);
    setTicketSelected({
      "numoscab": dataSelect.numoscab,
      "peroscab": dataSelect.peroscab,
      "anooscab": dataSelect.anooscab,
      "numsuc": dataSelect.numsuc,
      "numemp": "01",
      "paciente": dataSelect.paciente
    });
  }

  const handlePrintBarCode = (ticket) => {
    setLoading(true);
    setTicketSelected(ticket);
    getBarcodeSamples(ticket);
  }

  const getBarcodeSamples = async (ticket) => {
    const dataSelect = atencion.dataListAttention.attentionList.find(a => a.header.ticket === ticket);

    const requestData = {
      "osNumber": dataSelect.header.numoscab,
      "period": dataSelect.header.peroscab,
      "year": dataSelect.header.anooscab,
      "branchOffice": dataSelect.header.numsuc
    }

    await GetDataServer('post', URLAPI + "laboratory/" + "barcode-to-samples", true, requestData)
      .then(data => {
        barCodeArray.length > 0 ? setBarCodeArray('') : setBarCodeArray(data.samplesBarcode);

        setLoading(false);
        setPrintBarCode(true);
      })
      .catch(
      )
  }

  const handleAttachMedicalOrder = (ticket) => {
    setLoading(true);
    setTicketSelected(ticket);
    getMedicalOrderAttached(ticket);
    // setLoading(false);
  }

  const getMedicalOrderAttached = async (ticket) => {
    const dataSelect = atencion.listAtentionGenerated.find(a => a.ticket === ticket);

    const requestData = {
      "osNumber": dataSelect.numoscab,
      "period": dataSelect.peroscab,
      "year": dataSelect.anooscab,
      "branchOffice": dataSelect.numsuc
    }

    await GetDataServer('post', URLAPI + "ticket/" + "get-medical-order-attached", true, requestData)
      .then(data => {
        setAttached(data.attachments);
        setLoading(false);
        setAttachMedOrder(true);
      })
      .catch(
      )
  }

  const handleSaveAttachMedOrder = (attachments) => {
    setLoading(true);
    setAttached(attachments)
    handleCloseAttachMedOrder();
    saveAttachMedicalOrder(attachments);
    setLoading(false);
  }

  const saveAttachMedicalOrder = async (attachments) => {
    const dataSelect = atencion.listAtentionGenerated.find(a => a.ticket === ticketSelected);

    const requestData = {
      "OSNumber": dataSelect.numoscab,
      "Period": dataSelect.peroscab,
      "Year": dataSelect.anooscab,
      "BranchOffice": dataSelect.numsuc,
      "User": localStorage.getItem("user"),
      "Attachments": attachments,
      "Pacient": dataSelect.paciente
    }

    await GetDataServer('post', URLAPI + "ticket/" + "attach-medical-order", true, requestData)
      .then(data => {
        setLoading(false);
      })
      .catch(
      )
  }

  const handleClosePrintTicket = () => {
    setTicketArray('');
    setPrintTicket(false);
  }

  const handleClosePrintBarCode = () => {
    setBarCodeArray('');
    setPrintBarCode(false);
  }

  const handleCloseTicketEdit = () => {
    setTicketEdit(false);
  }

  const handleCloseAttachMedOrder = () => {
    setAttachMedOrder(false);
  }

  //Obtener la lista de servicios del ticket
  const handleSelectRow = ticket => {
    idRowOpen && idRowOpen === ticket ? setIdRowOpen(null) : setIdRowOpen(ticket)
  }

  //ELIMINAR SERVICIO
  const handleDeleteService = serviceId => {
    const listServices = rowsDetail.map(s => s.numser)
    if (listServices.length > 1) {
      //Se puede eliminar      
      const dataSelect = atencion.dataListAttention.find(a => a.ticket === idRowOpen)

      const [serviceId, ...rest] = listServices

      let listServicesMod = ""

      rest.forEach((service, index) => {
        listServicesMod = index === 0 ? service : listServicesMod + ',' + service
      })

      changeTicket({
        "idOrden": dataSelect.numoscab,
        "periodo": dataSelect.peroscab,
        "anio": dataSelect.anooscab,
        "sucursal": dataSelect.numsuc,
        "RegistrationUser": localStorage.getItem("user"),
        "empresa": dataSelect.numemp,
        "servicios": listServicesMod
      })
      setRowsDetail([])
      setIdRowOpen(null)
    }
    else {
      setOpenDialog(true);
    }
  }

  const handleCloseDeleteService = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    setRows(dataAttentionList)
  }, [dataAttentionList])


  return (
    <div className={classes.root}>
      {
        <div>
          <Typography variant="h4" component="h4" className={classes.title}>
            ATENCIONES GENERADAS
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead className={classes.headColorTable}>
                <TableRow>
                  <TableCell />
                  <TableCell align="center">N° TICKET</TableCell>
                  <TableCell align="center" colSpan="2">ACCIONES</TableCell>
                  <TableCell align="center">FECHA</TableCell>
                  <TableCell align="center">HORA</TableCell>
                  <TableCell align="center">PACIENTE</TableCell>
                  <TableCell align="center">DOCUMENTO</TableCell>
                  <TableCell align="center">N° DOCUMENTO</TableCell>
                  <TableCell align="center">PRECIO SOLES</TableCell>
                  <TableCell align="center">PRECIO DOLARES</TableCell>
                  {/* <TableCell align="center">COBERTURA IAFAS</TableCell> */}
                  {/* <TableCell align="center">COBERTURA DISAMAR</TableCell> */}
                  {/* <TableCell align="center">CLIENTE PAGA</TableCell> */}
                  {/* <TableCell align="center">EDITAR</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.attentionList.map((row, index) => (
                  <Row
                    key={index}
                    row={row.header}
                    rowDetail={row.detail.serviceList}
                    itemSelect={idRowOpen}
                    setOpenRow={handleSelectRow}
                    onDelete={handleDeleteService}
                    // onDeleteTicket={handleDeleteTicket}
                    onPrintTicket={handlePrintTicket}
                    onPrintBarCode={handlePrintBarCode}
                    // onAttachMedicalOrder={handleAttachMedicalOrder}
                    onEditTicket={handleEditTicket}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      }

      <Dialog onClose={handleCloseDeleteService} aria-labelledby="simple-dialog-title" open={openDialog}>
        <DialogContent>
          <div style={{ textAlign: 'center' }}>
            <BotSuiza />
          </div>
          <div className={classes.mensajeAlerta}>
            Lo sentimos no se puede eliminar el servicio seleccionado, ya que el ticket solo cuenta con este servicio. En este caso debe anular el ticket.
          </div>
        </DialogContent>
      </Dialog>

      {
        printTicket &&
        (
          <PrintTicket
            printTicket={printTicket}
            ticketArray={ticketArray}
            onClosePrintTicket={handleClosePrintTicket}
          >

          </PrintTicket>
        )
      }
      {
        printBarCode &&
        (
          <PrintBarCode
            printBarCode={printBarCode}
            barCodeArray={barCodeArray}
            onClosePrintBarCode={handleClosePrintBarCode}
          >

          </PrintBarCode>
        )
      }
      {
        attachMedOrder &&
        (
          <AttachMedicalOrder
            attachMedOrder={attachMedOrder}
            onCloseAttachMedOrder={handleCloseAttachMedOrder}
            onSaveAttachMedOrder={handleSaveAttachMedOrder}
            onMedicalOrderAttached={attached}
          >

          </AttachMedicalOrder>
        )
      }
      {
        ticketEdit &&
        (
          <TicketEdition
            ticket={ticketSelected}
            listaUnidades={atencion}
            actualizarUnidadTicket={actualizarUnidadTicket}
            onCloseEditTicket={handleCloseTicketEdit}
          >

          </TicketEdition>
        )
      }

      <Load open={loading} />
    </div>
  );
}


const mapStateToProps = state => ({
  atencion: state.atencion,
  userCompany: state.userCompany,
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
      ...actionCreatorsUser
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableAtention)
