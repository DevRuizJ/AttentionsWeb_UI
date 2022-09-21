import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  content:{
    textAlign:'center'
  },
  text:{
    color:theme.palette.white
  }
}));

export default function LoadingEscaneo({state=false}) {
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={state}>
        <div className={classes.content}>
          
        <CircularProgress color="inherit" />
        <Typography variant='h3' component='h3' className={classes.text}>
          ESCANEANDO...
        </Typography>
        </div>
        
      </Backdrop>
    </div>
  );
}
