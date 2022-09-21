import React from 'react'
import { makeStyles } from '@material-ui/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  IconButton,
  Tooltip,
  Popover,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';
import { actionCreators } from "../../../../store/Services";



const useStylesAnalitica = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  content: {
    maxWidth: '700px',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.dark,
    opacity: '0.9',
    color: theme.palette.personalized.garylight,
  },
  title: {
    margin: theme.spacing(1, 0),
    color: theme.palette.personalized.garylight,
    fontWeight: "450"
  },
  container: {
    margin: theme.spacing(1, 0),
  },
  text: {
    margin: theme.spacing(0.5, 0),
  }
}))


const PreAnalitica = ({ codigo, grupo, getPreAnalitica, services }) => {

  const classes = useStylesAnalitica();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {

    getPreAnalitica({
      "Codigo": codigo,
      "idGrupo": grupo
    })
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const dataText = (title, value) =>
    <Grid item xs={12} container className={classes.text}>
      <Grid item xs={5}><b>{title}</b></Grid>
      <Grid item xs={7}>{value}</Grid>
    </Grid>



  return (
    <div>
      <Tooltip title="Ver Pre-Analítica">
        <IconButton aria-label="info" aria-describedby={id} onClick={handleClick}>
          <InfoOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}

      >
        <div className={classes.content}>
          <Typography className={classes.title}>PRE-ANALÍTICA</Typography>
          <Divider />
          <Grid container className={classes.container}>
            {dataText("CÓDIGO:", services.existPreAnalitica ? services.preanalitica.codigo : "")}
            {dataText("NOMBRE DE PRUEBA:", services.existPreAnalitica ? services.preanalitica.nombre : "")}
            {dataText("TIEMPO DE RESPUESTA:", services.existPreAnalitica ? services.preanalitica.duracion : "")}
            {dataText("CONDICIONES PRE-ANALÍTICAS PACIENTES:", services.existPreAnalitica ? services.preanalitica.condicionPaciente : "")}
            {dataText("CONDICIONES PRE-ANALÍTICAS REFERENCIAS:", services.existPreAnalitica ? services.preanalitica.condicionCompania : "")}
            {dataText("TIPO DE MUESTRA:", services.existPreAnalitica ? services.preanalitica.muestra : "")}
            {dataText("TIPO DE TUBO(COLOR) / RECIPIENTE:", services.existPreAnalitica ? services.preanalitica.tubo : "")}
            {dataText("MÉTODO / EQUIPO:", services.existPreAnalitica ? services.preanalitica.equipo : "")}
            {dataText("OBSERVACIONES:", services.existPreAnalitica ? services.preanalitica.observacion : "")}
          </Grid>
        </div>
      </Popover>
    </div>
  );
}

const mapStateToProps = state => ({
  services: state.services
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PreAnalitica)
