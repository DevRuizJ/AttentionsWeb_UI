import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link, useParams } from 'react-router-dom'

import { Typography, Grid, Breadcrumbs } from "@material-ui/core";
import { PatientAnonimusCreate, PatientDefaultCreate } from './components'
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: "3px",
  },
  content: {
    // marginTop: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2, 0),
  },
}));

const PatientCreate = () => {
  const classes = useStyles()

  //store
  let { id } = useParams();

  const [isPatientAnonimous, setIsPatientAnonimous] = useState(false)

  useEffect(() => {
    id === "anonimous" ? setIsPatientAnonimous(true) : setIsPatientAnonimous(false)
  }, [id])

  return (
    <div className={classes.root}>

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h4" component="h4" className={classes.title}>
            REGISTRO DE PACIENTE
          </Typography>
        </Grid>
        {
          <Grid item>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                to="/atenciones"
              >
                Generar Atenciones
              </Link>
              <Typography
                color="textPrimary"
              >
                Registro Paciente
              </Typography>
            </Breadcrumbs>
          </Grid>
        }

      </Grid>
      <div className={classes.content}>
        {
          isPatientAnonimous
            ? <PatientAnonimusCreate />
            : <PatientDefaultCreate />
        }
      </div>
    </div>
  );
};

export default PatientCreate

