import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
//import moment from 'moment';
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
  LinearProgress,
  Grid,
  CardHeader,
} from "@material-ui/core";
import validators from '../../../../common/validators'
const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    display: "flex",
    // '& > *': {
    //   margin: theme.spacing(1),
    // },
  },
  avatar: {
    marginLeft: "auto",
    height: 90,
    width: 90,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  gridTable: {
    backgroundColor: theme.palette.personalized.tableHeader,
    "& *": {
      color: theme.palette.background.default,
    },
  },
  titleTable: {
    fontWeight: "600",
    textAlign: "center",
  },
  title: {
    fontWeight: "600",
    textAlign: "right",
  },

  status: {
    color: "#ff0000",
  },

  locationText: {
    marginBottom: theme.spacing(0.2),

  },
  grid: {
    marginBottom: theme.spacing(2),
  }
}));

const ResultadoDetalle = (props) => {

  const { className, data, ...rest } = props;

  const classes = useStyles();

  const paciente = {
    ticket: data.ticket || "No definido",
    nombreCompleto: data.paciente || "No definido",
    correo: data.correo || "No definido",
    documento: data.documento || "No definido",
    sexo: data.sexo || "No definido",
    edad: data.edad || "No definido",
    avatarHombre: "https://www.flaticon.es/svg/static/icons/svg/1912/1912097.svg",
    avatarMujer: "https://www.flaticon.es/svg/static/icons/svg/1912/1912063.svg",
  };

  const [listServicios] = React.useState(data.examenes);

  const text = (name, valor) => (
    <React.Fragment>
      <Grid item xs={6} sm={3}>
        <Typography variant="h6" className={classes.title}>
          {name}:
        </Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography variant="body1">{valor}</Typography>
      </Grid>
    </React.Fragment>
  );

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Card>
        <CardContent>
          <div className={classes.details}>
            <div>
              <Typography gutterBottom variant="h3">
                Ticket N° {paciente.ticket}
              </Typography>
              <Typography
                className={classes.locationText}
                color="textSecondary"
                variant="body1"
              >
                <b>Paciente:</b> {paciente.nombreCompleto} ({paciente.edad}{" "}
                Años)
              </Typography>
              <Typography
                className={classes.locationText}
                color="textSecondary"
                variant="body1"
              >
                <b>Correo:</b> {paciente.correo}

              </Typography>
              <Typography
                className={classes.locationText}
                color="textSecondary"
                variant="body1"
              >
                <b>Documento:</b> {paciente.documento}
              </Typography>
              <Typography
                className={classes.locationText}
                color="textSecondary"
                variant="body1"
              >
                <b>Sexo:</b> {paciente.sexo}
              </Typography>
              {
                !data.ticketCancelado &&
                <Typography
                  className={classes.status}
                  color="textSecondary"
                  variant="body1"
                >
                  <b>Estado:</b> Pendiente de Pago
                </Typography>
              }
            </div>
            {
              paciente.sexo === "FEMENINO" ?
                <Avatar
                  alt="Paciente"
                  className={classes.avatar}
                  src={paciente.avatarMujer}
                />

                :
                <Avatar
                  alt="Paciente"
                  className={classes.avatar}
                  src={paciente.avatarHombre}
                />
            }



          </div>

          <div className={classes.progress}>
            <Typography variant="body2">Resultados: {data.porcentajeResultado}%</Typography>
            <LinearProgress value={data.porcentajeResultado} variant="determinate" />
          </div>

        </CardContent>
      </Card>
      <br></br>
      <Card>
        <CardHeader title="DETALLES DE ATENCIÓN" color="primary" />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={2}
            className={classes.grid}
          >
            {text("FECHA", data.fecha)}
            {text("TOTAL", validators.MontoPENDecimal(data.total))}

          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3} className={classes.gridTable}>
              <Typography variant="body1" className={classes.titleTable}>
                CÓDIGO
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridTable}>
              <Typography variant="body1" className={classes.titleTable}>
                EXÁMEN
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.gridTable}>
              <Typography variant="body1" className={classes.titleTable}>
                ESTADO
              </Typography>
            </Grid>
          </Grid>
          {listServicios &&
            listServicios.map((s, index) => (
              <Grid container spacing={3} key={index}>
                <Grid item xs={3}>
                  <Typography variant="body1">{s.codigo}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{s.examen}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1">{s.estado}</Typography>
                </Grid>
              </Grid>
            ))}
        </CardContent>
      </Card>



    </div>
  );
};

ResultadoDetalle.propTypes = {
  className: PropTypes.string,
};

export default React.memo(ResultadoDetalle)
