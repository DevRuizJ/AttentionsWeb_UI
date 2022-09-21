import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Paper
} from '@material-ui/core';
//Dependencias para la fecha
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from "date-fns/locale/es"
import format from "date-fns/format"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { schema } from './schema'
import { typeDocument } from "../../../../data";

/*************REDUX **********************/

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../../../../store/Atencion";
import { actionCreators as actionCreatorPaciente } from "../../../../../../store/Paciente";
/*************REDUX *********************/
import { useStyles } from './useStyles'
import { useHistory } from 'react-router-dom';


const PatientDefaultCreate = props => {

  const classes = useStyles()

  const { patient, newPatientDefault, atencion } = props

  const history = useHistory()

  const [selectedDate, setSelectedDate] = useState(null)

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  })


  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }))

  }, [formState.values])

  const hasError = field => formState.touched[field] && formState.errors[field] ? true : false

  //Función para cambiar los valores del formulario
  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value.toUpperCase()
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  }

  //Función para cambiar el género
  const handleChangeGenero = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        Sexo: event.target.value
      }
    }));
  }

  //Función para cambiar fecha de nacimiento
  const handleChangeFechaNac = (date) => {
    try {
      if (date && format(date, "dd/MM/yyyy", { locale: esLocale }).length === 10) {
        setSelectedDate(date)
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            FechaNac: format(date, "dd/MM/yyyy", { locale: esLocale })
          }
        }))
      } else {
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            FechaNac: date
          }
        }))

      }
    } catch {
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          FechaNac: null
        }
      }))
    }
  }

  //Función para enviar el registro del paciente
  const handleRegisterPaciente = (e) => {
    e.preventDefault()

    newPatientDefault(
      {
        "tipoDocumento": patient.searchPatientData.TipoDocumento.substring(3, 2),
        "numeroDocumento": patient.searchPatientData.NumeroDocumento,
        "nombre": formState.values.Nombre,
        "apellidoPaterno": formState.values.ApellidoPat,
        "apellidoMaterno": formState.values.ApellidoMat,
        "apellidoCasada": "-",
        "diaNacimiento": formState.values.FechaNac.substring(0, 2),
        "mesNacimiento": formState.values.FechaNac.substring(3, 5),
        "anioNacimiento": formState.values.FechaNac.substring(6, 10),
        "sexo": formState.values.Sexo,
        "estadoCivil": "-",
        "direccion": "-",
        "email": formState.values.Email,
        "telefonoMovil1": formState.values.TelefonoCel,
        "telefonoMovil2": "-",
        "nacionalidad": "-"
      }
    )
  }

  useEffect(() => {
    const { existPatitent, patientData } = atencion
    if (existPatitent && patientData)
      history.push('/atenciones')
  }, [atencion, history])

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant='h4' component='h4'>
        NUEVO PACIENTE
      </Typography>
      <Divider />
      <form
        className={classes.form}
        onSubmit={handleRegisterPaciente}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              className={classes.textField}
              fullWidth
              label={'N° de documento'}
              type="text"
              variant="outlined"
              value={patient.searchPatientData ? typeDocument.find(t => t.id === patient.searchPatientData.TipoDocumento).title + "-" + patient.searchPatientData.NumeroDocumento : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              className={classes.textField}
              error={hasError('Nombre')}
              fullWidth
              helperText={
                hasError('Nombre') ? formState.errors.Nombre[0] : null
              }
              label="Nombre"
              name="Nombre"
              onChange={handleChange}
              type="text"
              value={formState.values.Nombre || ''}
              variant="outlined"
              autoFocus
              required
              autoComplete='off'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              className={classes.textField}
              error={hasError('ApellidoPat')}
              fullWidth
              helperText={
                hasError('ApellidoPat') ? formState.errors.ApellidoPat[0] : null
              }
              label="Apellido Paterno"
              name="ApellidoPat"
              onChange={handleChange}
              type="text"
              value={formState.values.ApellidoPat || ''}
              variant="outlined"
              autoComplete='off'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              className={classes.textField}
              error={hasError('ApellidoMat')}
              fullWidth
              helperText={
                hasError('ApellidoMat') ? formState.errors.ApellidoMat[0] : null
              }
              label="Apellido Materno"
              name="ApellidoMat"
              onChange={handleChange}
              type="text"
              value={formState.values.ApellidoMat || ''}
              variant="outlined"
              autoComplete="off"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl component="fieldset" className={classes.radioButtons}>
              <FormLabel component="h6" >Género</FormLabel>
              <RadioGroup className={classes.radioGroup}
                aria-label="Sexo" name="Sexo"
                value={formState.values.Sexo || ''}
                onChange={handleChangeGenero}
              >
                <FormControlLabel value="F" control={<Radio />} label="Femenino" />
                <FormControlLabel value="M" control={<Radio />} label="Masculino" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MuiPickersUtilsProvider
              utils={DateFnsUtils}
              locale={esLocale}
            >
              <KeyboardDatePicker
                className={classes.fecha}
                variant="inline"
                disableToolbar
                autoOk
                helperText={
                  hasError('FechaNac') ? formState.errors.FechaNac[0] : null
                }
                label="Fecha de Nacimiento"
                margin="normal"
                format="dd/MM/yyyy"
                value={selectedDate || null}
                onChange={handleChangeFechaNac}
                KeyboardButtonProps={{
                  'aria-label': 'Cambiar Fecha',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              className={classes.textField}
              error={hasError('Email')}
              fullWidth
              helperText={
                hasError('Email') ? formState.errors.Email[0] : null
              }
              label="Email"
              name="Email"
              onChange={handleChange}
              type="email"
              value={formState.values.Email || ''}
              variant="outlined"
              required
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              className={classes.textField}
              error={hasError('TelefonoCel')}
              fullWidth
              helperText={
                hasError('TelefonoCel') ? formState.errors.TelefonoCel[0] : null
              }
              label="Telefono Movil"
              name="TelefonoCel"
              onChange={handleChange}
              type="text"
              value={formState.values.TelefonoCel || ''}
              variant="outlined"
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} className={classes.textProteccionDatos}>
            <div className={classes.inLine}>
              <Typography variant="h6" component="h5" color='secondary'>
                (*)  Los datos ingresados son necesarios para el procesamiento de resultados y su notificación.
              </Typography>
            </div>
          </Grid>
        </Grid>

        <Divider />
        <div className={classes.groupbutton}>
          <Button
            className={classes.buttonRegister}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            size='large'
            disabled={!formState.isValid || patient.isLoading}
            onClick={handleRegisterPaciente}
          >
            Registrar
          </Button>
        </div>
      </form>
    </Paper>
  )
}

const mapStateToProps = state => ({
  patient: state.patient,
  atencion: state.atencion
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
      ...actionCreatorPaciente
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PatientDefaultCreate)
