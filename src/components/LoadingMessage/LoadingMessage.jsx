import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root:{
    width:'100%'
  },
  content: {
    textAlign:'center'
    
  },
}));

export default function LoadingMessage({message="Cargando"}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <CircularProgress color="secondary" />
        <Typography variant='body1' component="div">
        {message}
        </Typography>
      </div>
    </div>
  );
}
