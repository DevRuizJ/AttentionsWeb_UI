import React, { useEffect, useState, forwardRef } from 'react';
//import PropTypes from 'prop-types';
//import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
  IconButton,
  Typography,
  Grid
} from '@material-ui/core';
// import { Grid, IconButton, Typography } from "@material-ui/core";

import {
  Reporte as ReporteIcon,
  Success as SuccessIcon,
  Error as ErrorIcon,
  Pendiente as PendienteIcon
} from "../../../../assets/icons";

import { DataTable } from "./components";
import { SearchBox } from "components";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1)
  },
  inline: {
    display: "inline-flex",
    alignItems: "center",
    margin: theme.spacing(0.5)
  },
  iParcialSuccess: {
    color: '#7AD58F',
    paddingLeft: "5px",
  },

  iParcialPendiente: {
    color: '#FAC32A',
    paddingLeft: "5px",
  },

  iParcialError: {
    color: '#F583A4',
    paddingLeft: "5px",
  },
}))

const BoxResume = ({ classes, indicadorTotal }) => {
  return (
    <div className={classes.inline}>
      <Grid
        container
        direction="row-reverse"
        justify="space-between"
        alignItems="center"
        spacing={3}
      >
        <Grid item className={classes.inline}>
          <div className={classes.inline}>
            <SuccessIcon />
            <div>
              <Typography className={classes.iParcialSuccess}>
                Completo
                          </Typography>
              <Typography
                variant="subtitle2"
                className={classes.iParcialSuccess}
              >
                {indicadorTotal.completo}
              </Typography>
            </div>
          </div>
          <div className={classes.inline}>
            <PendienteIcon />
            <div>
              <Typography className={classes.iParcialPendiente}>
                Parcial
                          </Typography>
              <Typography
                variant="subtitle2"
                className={classes.iParcialPendiente}
              >
                {indicadorTotal.parcial}
              </Typography>
            </div>
          </div>
          <div className={classes.inline}>
            <ErrorIcon />
            <div>
              <Typography className={classes.iParcialError}>
                Pendiente
                          </Typography>
              <Typography
                variant="subtitle2"
                className={classes.iParcialError}
              >
                {indicadorTotal.pendiente}
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
const ListaResultados = (props) => {
  const classes = useStyles();
  const { data, onSelect } = props;
  const [listResults, setListResults] = useState([]);
  const [indicadorTotal, setIndicadorTotal] = useState({
    completo: 0,
    pendiente: 0,
    parcial: 0
  });
  //configuramos la data de la tabla
  useEffect(() => {
    const getActionTable = (state, rowData) => {
      if (state > 0)
        return (
          <IconButton
            aria-label="Select"
            onClick={() => onSelect(rowData)}>
            <ReporteIcon />
          </IconButton>
        )
      else
        return null
    }

    const getStateResultado = state => {

      switch (state) {
        case 100:
          return <SuccessIcon />
        case 0:
          return <ErrorIcon />
        default:
          return <PendienteIcon />
      }
    }


    if (data) {
      let contTotal = 0
      let contParcial = 0
      let contPendiente = 0
      const dataRows = data.map((c) => {
        if (c.porcentajeResultado === 100) contTotal++;
        else if (c.porcentajeResultado === 0) contPendiente++;
        else contParcial++;

        return {
          action: getActionTable(c.porcentajeResultado, c),
          estado: getStateResultado(c.porcentajeResultado),
          ticket: c.ticket,
          atencion: c.fecha,
          paciente: c.paciente,
          documento: c.documento,
          idOrden: c.idOrden,
          periodo: c.periodo,
          anio: c.anio,
          sucursal: c.sucursal,
          empresa: c.empresa,
        };
      });

      setListResults(dataRows);

      setIndicadorTotal({
        completo: contTotal,
        pendiente: contPendiente,
        parcial: contParcial
      })
    }
  }, [data, onSelect]);

  const [filter, setFilter] = React.useState("")
  const [dataFilter, setDataFilter] = React.useState(null)
  const handleFilter = filterText => {
    setFilter(filterText)

    if (filterText.length > 0) {
      const dataFiltrada = []
      listResults.forEach(s => {
        if (s.ticket.includes(filterText) || s.paciente.includes(filterText) || s.documento.includes(filterText)) {
          dataFiltrada.push(s)
        }
      })
      setDataFilter(dataFiltrada)

    }
    else {
      setDataFilter(null)
    }
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.actions}>

        <Grid item xs={12} sm={6}>
          <BoxResume
            classes={classes}
            indicadorTotal={indicadorTotal}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SearchBox
            onChangeFilter={handleFilter}
            filter={filter}
          />

        </Grid>
        <Grid item xs={12} >
          <DataTable
            classes={classes}
            rows={dataFilter || listResults}
          />
        </Grid>
      </Grid>
    </div>
  );
}


export default ListaResultados
