import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 150,
    textAlign: 'center'
  },
  image: {
    marginBottom: theme.spacing(3),
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  },
  button: {
    margin: theme.spacing(2),
  },
}))

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        spacing={4}
      >
        <Grid
          item
          lg={6}
          xs={12}
        >
          <div className={classes.content}>
            <img
              alt="Imagen de no existe"
              className={classes.image}
              src="images/not-found.png"
            /> 
            <Typography variant="h1">
              Su sesión ha culminado!
            </Typography>
            <Typography variant="subtitle2">
              Lo sentimos, pero por su sesión ha culminado, le recomendamos volver a iniciar sesión.              
            </Typography>  
            <Link to='/login'>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<AddToHomeScreenIcon />}
              >
                Iniciar Sesión
              </Button>               
            </Link>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default NotFound;
