import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link, useHistory } from 'react-router-dom'
import { Button, Typography } from "@material-ui/core";
import { TableReception,CodeBar } from "./components";

/*************REDUX **********************/
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "store/Attention";
/*************REDUX **********************/

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: "3px",
  },
  contentEscaneo:{
    width:'100%'
  },
  section:{
    padding:theme.spacing(2)
  },
  prev:{
    padding:theme.spacing(2),
    textAlign:'end'
  }
}));

const SampleReception = ({loteAtenciones, clearLote}) => {
  const classes = useStyles()
  
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {
            loteAtenciones.length>0
            &&
            <div className={classes.contentEscaneo}>
              <div  className={classes.section}>
                <Typography variant='h5' component='h5'>
                  LOTE N° {loteAtenciones[0].lote} <span>{loteAtenciones.length>0&&<CodeBar loteAtenciones={loteAtenciones} />}</span>
                </Typography>
                <Typography variant='h5' component='h5'>
                  FECHA GENERADO: {loteAtenciones[0].fechaLote}
                </Typography>
                <br/>
                <Typography variant='h5' component='h5'>
                  COMPAÑIA: {loteAtenciones[0].nombreCia}
                </Typography>
            </div>
            <TableReception />
            <div className={classes.prev}>

              <Button
                variant="contained"
                color="primary"
                onClick={()=>clearLote()}
              >
                NUEVA BUSQUEDA
              </Button>
            </div>
          </div>
          
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  attention: state.attention
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SampleReception)



