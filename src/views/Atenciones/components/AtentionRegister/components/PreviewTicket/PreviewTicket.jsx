import React, { useEffect } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { Grid, IconButton, Typography } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

/*************REDUX **********************/

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../../../../store/Atencion";
import { actionCreators as actionCreatorsUser } from "../../../../../../store/User";
/*************REDUX *********************/
import validator from '../../../../../../common/validators'
import { Delete as DeleteIcon } from '@material-ui/icons';
import { useStyles } from './useStyles';
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';

const ucn = [{ id: 1, descripcion: 'Ambulatorio' },
{ id: 2, descripcion: 'Emergencia Adulto' }]; //OBJETO
const diagnostico = ['Z01.7', 'N23.X', 'K83.0']; //TEXTO

const PreviewTicket = (props) => {

  const { userCompany: usercompany, atencion, setPreviewTicket, setSelectServices, atentionRegister, selectCompania, dataIafas, listarUnidadTicket, getCieDiagnosisList, attentionRegister } = props

  const { cellPhone, email, branchOffice } = props;

  const classes = useStyles();

  const patient = /*atencion.existPatientDataIafasMostrar ? atencion.patientDataIafasMostrar :*/ atencion.patientData


  const [state, setState] = useState(atencion.listServicesSelect.preview);

  //Control de estados para Diagnostico
  const [diagnosticoValue, setDiagnosticoValue] = useState([]);
  const [inputDiagnosticoValue, setInputDiagnosticoValue] = useState('');

  //Control de estados para Unidad de Cuidados Naval UCN - Servicio/ Sala
  const [ucnValue, setUcnValue] = useState([]); //SIN USO
  const [inputUcnValue, setInputUcnValue] = useState('');

  //**Estado de control para deshabilitar el boton de Generar Ticket, al darle clicks consecutivos se generan varios tickets con la misma info*/
  const [disableButton, setDisableButton] = useState(false);

  //Control de estados para Observacion
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  })

  const [discount, setDiscount] = useState('0');
  const [observations, setObservations] = useState('Sin observaciones.');


  useEffect(() => {
    setState(atencion.listServicesSelect.preview)
  }, [atencion.listServicesSelect.preview])

  useEffect(() => {
    listarUnidadTicket({});
  }, [])

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      setPreviewTicket(false)
      return;
    }
    setState(open);
    setPreviewTicket(open)
  };

  const handleDeleteService = id => {
    const newItemsSelected = []
    atencion.listServicesSelect.servicesSelect.forEach(s => {
      if (s.id !== id) newItemsSelected.push(s)
    })
    setSelectServices(newItemsSelected)
  }



  const handleGenerateTicket = () => {
    
    setDisableButton(true);

    let listServices = ""
    atencion.listServicesSelect.servicesSelect.forEach((s, index) => {
      listServices = index === 0 ? s.codigo : listServices + ',' + s.codigo
    })

    const data = {
      anioPaciente: patient.anioPaciente,
      numeroPaciente: patient.idpaciente,
      compania: selectCompania, //usercompany.compania,
      registrationUser: localStorage.getItem("user"),
      servicios: listServices,
      branchOffice: branchOffice,
      telefono1: cellPhone,
      correo: email,
      observation: formState.values.observation,
      discount: discount

      // tarifaIpress: patient.tarifaIpress || '',
      // tarifaDisamar: patient.tarifaDisamar || '',
      // diagnosis: diagnosticoValue,
      // navalCareUnit: ucnValue
    }

    attentionRegister(data);

    disableButton && setDisableButton(false);
  }

  const handleCalcTotal = () => {
    let suma = 0
    if (atencion.listServicesSelect.servicesSelect.length > 0) {
      const precioServicios = atencion.listServicesSelect.servicesSelect.map(s => parseFloat(s.precio))
      suma = precioServicios.reduce((acumulador, valor) => acumulador + valor)
    }

    return validator.MontoPENDecimal(suma)
  }

  const handleCalcDiscount = () => {
    let suma = 0
    if (atencion.listServicesSelect.servicesSelect.length > 0) {
      const precioServicios = atencion.listServicesSelect.servicesSelect.map(s => parseFloat(s.precio))
      // suma = ((100 - discount) * (precioServicios.reduce((acumulador, valor) => acumulador + valor))) / 100
      const total = precioServicios.reduce((acumulador, valor) => acumulador + valor);

      suma = total - ((total * discount) / 100);
    }

    return validator.MontoPENDecimal(suma)
  }



  const handleOnChangeCie = (cie) => {
    const cieSelected = atencion.dataCie.find(c => c.description == cie)
    setDiagnosticoValue(cieSelected.code);
  }

  const handleOnChangeUcn = (ucn) => {
    const ucnSelected = atencion.dataUnidad.find(c => c.unidad == ucn)
    setUcnValue(ucnSelected.codigo);
  }

  const handleOnChangeObservation = (e) => {
    e.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [e.target.name]: e.target.value.toUpperCase()
      },
      touched: {
        ...formState.touched,
        [e.target.name]: true
      }
    }));

    // setObservations(e.target.value.toUpperCase());
  }

  return (
    <div>
      <Drawer
        anchor='right'
        open={state}
        onClose={toggleDrawer(false)}
      >
        <div
          className={classes.list}
          role="presentation"
        >
          <List className={classes.title}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} >
                <Typography
                  component="span"
                  variant="h1"
                  color="textPrimary"
                >
                  TICKET
                </Typography>
              </Grid>

              <Grid item xs={12} >
                <Typography
                  component="span"
                  variant="h4"
                  color="textPrimary"
                >
                  N° 00000000000
                </Typography>
              </Grid>
            </Grid>
          </List>
          <Divider />
          <List className={classes.content}>
            <Typography variant="subtitle1" color="textPrimary" >
              <div style={{ display: 'flex' }}>
                <div style={{ width: '100px' }}>
                  <b>APELLIDOS Y NOMBRES</b>
                </div>
                <div style={{ width: '3%' }}>
                  <b>:</b>
                </div>
                <div>
                  {patient.paciente}
                </div>
              </div>
            </Typography>
            <Typography variant="subtitle1" color="textPrimary" >
              <div style={{ display: 'flex' }}>
                <div style={{ width: '100px' }}>
                  <b>DOCUMENTO</b>
                </div>
                <div style={{ width: '3%' }}>
                  <b>:</b>
                </div>
                <div>
                  {patient.numeroDocumento}
                </div>
              </div>
            </Typography>
            <Typography variant="subtitle1" color="textPrimary" >
              <div style={{ display: 'flex' }}>
                <div style={{ width: '100px' }}>
                  <b>EDAD</b>
                </div>
                <div style={{ width: '3%' }}>
                  <b>:</b>
                </div>
                <div>
                  {patient.edad + ' años'}
                </div>
              </div>
            </Typography>
            <Typography variant="subtitle1" color="textPrimary" >
              <div style={{ display: 'flex' }}>
                <div style={{ width: '100px' }}>
                  <b>SEXO</b>
                </div>
                <div style={{ width: '3%' }}>
                  <b>:</b>
                </div>
                <div>
                  {patient.sexo === 'F' ? 'FEMENINO' : 'MASCULINO'}
                </div>
              </div>
            </Typography>
            {/* <Typography variant="subtitle1" color="textPrimary">
              <b>COBERTURA IAFAS: </b> {patient.tarifaIpress != null ? patient.tarifaIpress : 0}%
            </Typography> */}
          </List>
          <Divider />
          {/* <List className={classes.content}>
            <div>
              <Autocomplete
                isOptionEqualToValue={(cieDiagnosis, value) => cieDiagnosis.code === value.code}
                inputValue={inputDiagnosticoValue}
                onInputChange={(event, newInputValue) => {
                  setInputDiagnosticoValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={atencion.dataCie && atencion.dataCie.map((cieDiagnosis) => cieDiagnosis.description)}
                sx={{ width: 300 }}
                onChange={(e, cieChange) => {
                  handleOnChangeCie(cieChange);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Diagnostico"
                  />
                )}
              />
            </div>
          </List>
          <List className={classes.content}>
            <Typography variant="subtitle1" color="textPrimary">
              <b>CODIGO DIAGNOSTICO: </b> {diagnosticoValue}
            </Typography>
          </List>
          <List className={classes.content}>
            <div>
              <Autocomplete
                isOptionEqualToValue={(ucn, value) => ucn.codigo === value.codigo}
                inputValue={inputUcnValue}
                onInputChange={(event, newInputValue) => {
                  setInputUcnValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={atencion.dataUnidad && atencion.dataUnidad.map((ucn) => ucn.unidad)}
                sx={{ width: 300 }}
                onChange={(event, ucnChange) => {
                  handleOnChangeUcn(ucnChange);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Servicio/ Sala"
                  />
                )}
              />
            </div>
          </List> */}
          <List className={classes.content}>
            <Typography variant="subtitle1" color="textPrimary">
              <div style={{ display: 'flex' }}>
                <div style={{ width: '100px' }}>
                  <b>DESCUENTO</b>
                </div>
                <div style={{ width: '3%' }}>
                  <b>:</b>
                </div>
                <Grid>
                  <TextField
                    label="% Descuento"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}      //Ejecuta el evento
                    style={{ width: '80%' }}
                  />
                </Grid>
                {/* <input type='text' style={{width: '50px'}}></input> */}
              </div>
            </Typography>
          </List>
          <List className={classes.contentTable}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-end"
              className={classes.tableHeader}
            >
              <div className={clsx([classes.item1, classes.textCenter])}>CÓDIGO</div>
              <div className={clsx([classes.item2, classes.textCenter])}>EXÁMEN</div>
              <div className={clsx([classes.item3, classes.textCenter])}>PRECIO</div>
              <div className={clsx([classes.item4, classes.textCenter])}>-</div>
            </Grid>
            {
              atencion.listServicesSelect.servicesSelect.length > 0 &&
              atencion.listServicesSelect.servicesSelect.map(s =>
                <React.Fragment key={s.id}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                  >
                    <div className={clsx([classes.item1, classes.textCenter])}>{s.id}</div>
                    <div className={classes.item2}>{s.descripcion}</div>
                    <div className={classes.item3}>{validator.MontoPENDecimal(s.precio)}</div>
                    <div className={clsx([classes.item4, classes.textCenter])}>
                      <IconButton aria-label="delete" onClick={() => handleDeleteService(s.id)}>
                        <DeleteIcon fontSize="small" color='primary' />
                      </IconButton>
                    </div>
                  </Grid>
                  <Divider />
                </React.Fragment>
              )
            }
            <List className={classes.content}>
              <TextField
                label="Observaciones"
                name="observation"
                placeholder="Indique aquí sus observaciones."
                multiline
                minRows={6}
                maxRows={6}
                inputProps={{ maxLength: 175 }}
                style={{ width: 300 }}
                value={formState.values.observation}
                // value={observations}
                onChange={handleOnChangeObservation}
              // onChange={(e) => setObservations(e.target.value)}
              />
            </List>
            <Divider />
            <div className={classes.total}>Total: {handleCalcTotal()}</div>
            <div className={classes.total}>CLIENTE PAGA: {handleCalcDiscount()}</div>
          </List>
          <List>
            <div className={classes.footer} >
              <Button
                variant="contained"
                color="primary"
                type='submit'
                endIcon={<LockIcon />}
                onClick={handleGenerateTicket}
                disabled={disableButton}
              >
                GENERAR TICKET
              </Button>
            </div>
          </List>
        </div>
      </Drawer>
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
export default connect(mapStateToProps, mapDispatchToProps)(PreviewTicket)
