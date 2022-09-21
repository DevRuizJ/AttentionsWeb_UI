import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography,Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    width:'100%',
    height:'100%'
  },
  content: {
    textAlign: 'center'
  },
  image: {
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  },
  grid:{
    height:'100%'
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={4}
        className={classes.grid}
      >
        <Grid
          item
          lg={6}
          xs={12}
        >
          <div className={classes.content}>
            <img
              alt="Under development"
              className={classes.image}
              src="/images/Login/Error404.svg"
            />
            <Typography variant="h1">
            Ooops!!... página no encontrada!
            </Typography>
            <br/>

            <Typography variant="subtitle2">
              Lo sentimos pero la página que busca no existe.<br/>
              Le recomendamos revisar la ruta de la página al que desea ingresar.
            </Typography>
            <br/>
            <Button variant="outlined" color="primary" href="/">
              Regresar
            </Button>

          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
