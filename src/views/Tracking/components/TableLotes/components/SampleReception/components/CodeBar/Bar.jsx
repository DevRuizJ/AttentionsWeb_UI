import React from 'react'
import { Typography,  makeStyles, Grid } from "@material-ui/core";
import { useBarcode } from 'react-barcodes';

const useStyles = makeStyles((theme) => ({

  root: {
    padding: theme.spacing(3),
    paddingTop: '3px',
  },

  content: {
    position:'relative'
  },

  ticket: {
    backgroundColor: 'white',
    padding: theme.spacing(1),
    width: '70mm',
    height: '40mm', //25,4 mm
    textAlign: 'center',
    paddingLeft:'25px',
    // margin: '25px',
  },
  img: {
    textAlign:'left',
    paddingLeft: '4px',
    overflow:'hidden',
    height: 80,
  },
  title: {
    textAlign: 'justify',
    padding: '4px',
    fontSize: '16px',
    lineHeight: '5px',
    fontFamily: 'Teko',
    wordBreak: 'break-all',
    color: '#000',
    overflow:'hidden'
  },
  numOrden: {
    textAlign: 'justify',
    padding: '4px',
    fontSize: '19px',
    lineHeight: '8px',
    fontFamily: 'Teko',
    color: '#000',
    paddingBottom:'10px'
  },
  subTitle: {
    textAlign: 'justify',
    padding: '3px',
    fontSize: '14px',
    lineHeight: '7px',
    fontFamily: 'Teko',
    color: '#000',
  },
  subTitle2: {
    textAlign: 'justify',
    padding: '3px',
    fontSize: '14px',
    lineHeight: '7px',
    fontFamily: 'Teko',
    textAlignLast: 'justify',    
    color: '#000',
  },

  tapa: {
    // float: 'revert',
    transform: 'rotate(270deg)',
    fontFamily: 'Teko',
    color: '#000',
    fontSize: '14px',    
    position:'absolute',
    letterSpacing:'0.5px',
    bottom:'48%',
    left:'-56px',
    width: '150px',
    overflow: 'hidden'   
  },

}));
const Bar = ({muestra}) => {
  const classes = useStyles();


  return (

    <>
      <div 
        className={classes.content}
      >
        <div className={classes.tapa}><div className={classes.tapaText}>{muestra.tubo}</div></div>
        <div className={classes.ticket}>
          <Typography className={classes.title} variant='body1'>{muestra.paciente}</Typography>
          <div className={classes.img}>
            <svg ref={GetCodeBar(muestra.orden)} />
          </div>
          <div className={classes.numOrden}>{muestra.orden}</div>
          <div className={classes.subTitle}>{muestra.descripcion}</div>
          <div className={classes.subTitle2}>{`Sexo: ${muestra.sexo} - Edad: ${muestra.edad} - SUIZALAB`}</div>
        </div>
      </div>
    </>
  )
}
function GetCodeBar(id) {
  const { inputRef } = useBarcode({
    value: id,
    options: {
      format: "CODE39",
      // background: '#ccffff',
      width: 1,
      height: 75,
      textMargin: 0,
      fontSize: 18,
      marginTop: 1,
      marginLeft: 1,
      textPosition: 'bottom',
      textAlign: "left",     
      displayValue:false
    }
  });
  return inputRef;
}
export default Bar

