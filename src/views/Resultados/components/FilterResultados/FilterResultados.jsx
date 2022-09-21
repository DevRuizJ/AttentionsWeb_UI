import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@material-ui/core';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { Search as SearchIcon } from "../../../../assets/icons";
//Dependencias para la fecha
//import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from "date-fns/locale/es"
import format from "date-fns/format"

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    position: 'absolute',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  margin: {
    margin: theme.spacing(2),
  },
  grid: {
    margin: theme.spacing(1),
    marginTop: 0,
    width: '100%',
  },
  fecha: {
    marginTop: 0,
    width: '100%',
  },
  text: {
    color: theme.palette.text.secondary,
    '& *': {
      color: theme.palette.text.secondary
    }
  },
  btnSearch: {
    marginBottom: theme.spacing(1),
  },

}))
/* Función que suma o resta días a una fecha, si el parámetro
  días es negativo restará los días*/

function operarFecha(fecha, dias) {
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
}

const Finicial = operarFecha(new Date(), -30)
const Ffin = operarFecha(new Date(), 0)

const ButtonFilter = React.memo(({ classes, onClickFilter }) => {
  return (<Button
    variant="contained"
    color="primary"
    type="submit"
    endIcon={<SearchIcon />}
    onClick={onClickFilter}
    className={classes.btnSearch}
  >
    Buscar
  </Button>)
})

const CalendarSelect = React.memo(({ title, classes, selectedDate, setSelectedDate }) => {
  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={esLocale}
    >
      <KeyboardDatePicker
        className={clsx([classes.fecha, classes.text])}
        label={title}
        margin="normal"
        format="dd/MM/yyyy"
        variant="inline"
        disableToolbar
        disableFuture
        autoOk
        value={selectedDate}
        onChange={date => setSelectedDate(date)}
        KeyboardButtonProps={{
          'aria-label': 'Cambiar fecha',
        }}
      />
    </MuiPickersUtilsProvider>
  )
})

const FilterResultados = React.memo(({ onFilter, companiaData }) => {
  const classes = useStyles();
  const [selectedDateIni, setSelectedDateIni] = useState(Finicial)
  const [selectedDateFin, setSelectedDateFin] = useState(Ffin)
  const [isSearch, setIsSearch] = useState(false)
  const [companiaR, setCompania] = useState(null)

  const handleChangeCompania = (event) => {
    switch (event.target.name) {
      case 'companiaR':
        setCompania(event.target.value);
        break;
    }
  }

  const handleSelectInitDate = useCallback(
    (date) => {
      setSelectedDateIni(date)
    },
    [setSelectedDateIni],
  )
  const handleSelectEndDate = useCallback(
    (date) => {
      setSelectedDateFin(date)
    },
    [setSelectedDateFin],
  )

  const handleSearchCallback = useCallback(() => {
    setIsSearch(true)
  }, [setIsSearch])

  useEffect(() => {
    if (isSearch) {
      onFilter({
        fechaInicio: format(selectedDateIni, "dd/MM/yyyy", { locale: esLocale }),
        fechaFin: format(selectedDateFin, "dd/MM/yyyy", { locale: esLocale }),
        compania: companiaR
      })
      setIsSearch(prevValue => !prevValue)
    }
  }, [onFilter, isSearch])

  // useEffect(()=>{
  //   const data = {
  //     fechaInicio: format(selectedDateIni, "dd/MM/yyyy", { locale: esLocale }),
  //     fechaFin: format(selectedDateFin, "dd/MM/yyyy", { locale: esLocale }),
  //     companiaR: companiaR
  //   }
  //     onFilter(data)
  // },[onFilter])

  return (
    <Paper className={classes.root}>
      {
        selectedDateIni && selectedDateFin
        &&
        <Grid
          container
          spacing={3}
          className={classes.grid}
          alignItems='flex-end'
        >
          <Grid item xs={12} sm={12} >

            <FormControl className={classes.formControl} variant="outlined" style={{ width: '100%' }}>
              <InputLabel id="demo-simple-select-error-label">Compañia</InputLabel>
              <Select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                value={companiaR}
                onChange={handleChangeCompania}
                label="companiaR"
                name="companiaR"
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {
                  companiaData.data && companiaData.data.map(c =>
                    <MenuItem key={c.seekcia} value={c.seekcia} >{c.descripcion}</MenuItem>
                  )
                }
              </Select>
              {!companiaR && <FormHelperText className={classes.error}>Seleccione la compañia</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <CalendarSelect
              title="Fecha de Inicio"
              classes={classes}
              selectedDate={selectedDateIni}
              setSelectedDate={handleSelectInitDate}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <CalendarSelect
              title="Fecha de Fin"
              classes={classes}
              selectedDate={selectedDateFin}
              setSelectedDate={handleSelectEndDate}
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <ButtonFilter onClickFilter={handleSearchCallback} classes={classes} />
          </Grid>
        </Grid>
      }
    </Paper>
  );
})

export default React.memo(FilterResultados)
