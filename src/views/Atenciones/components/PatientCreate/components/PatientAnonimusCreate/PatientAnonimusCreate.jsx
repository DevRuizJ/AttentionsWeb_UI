import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
// import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from "date-fns/locale/es"
import format from "date-fns/format"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { schema } from './schema'

/*************REDUX **********************/

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../../../../store/Atencion";
import { actionCreators as actionCreatorPaciente } from "../../../../../../store/Paciente";

/*************REDUX *********************/
import { useStyles } from './useStyles'

const PatientAnonimusCreate = props => {
  const classes = useStyles()
  const history = useHistory()
  const { patient, newPatientAnonimous } = props
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
  const handleRegisterPaciente = event => {
    event.preventDefault()
    newPatientAnonimous({
      "Sexo": formState.values.Sexo,
      "Nombre": formState.values.Nombre,
      "FechaNacimiento": formState.values.FechaNac
    })
  }

  React.useEffect(() => {
    if (patient.existPatitent)
      history.push('/atenciones')
  }, [patient.existPatitent, history])

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant='h4' component='h4'>
        NUEVO PACIENTE ANÓNIMO
      </Typography>
      <Divider />
      <form
        className={classes.form}
        onSubmit={handleRegisterPaciente}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} container>
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
              autoFocus
              required
              autoComplete='off'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MuiPickersUtilsProvider
              utils={DateFnsUtils}
              locale={esLocale}
            >
              <KeyboardDatePicker
                className={classes.fecha}
                variant="inline"
                autoOk
                helperText={
                  hasError('FechaNac') ? formState.errors.FechaNac[0] : null
                }
                label="Fecha de Nacimiento"
                margin="normal"
                format="dd/MM/yyyy"
                value={selectedDate || null}
                onChange={handleChangeFechaNac}
                disableFuture
                KeyboardButtonProps={{
                  'aria-label': 'Cambiar Fecha',
                }}
              />
            </MuiPickersUtilsProvider>
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
export default connect(mapStateToProps, mapDispatchToProps)(PatientAnonimusCreate)
