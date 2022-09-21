import React, { useEffect, useState } from 'react';

import { makeStyles } from "@material-ui/styles";
import { useHistory } from 'react-router-dom'

import { Typography, Grid, Breadcrumbs, Paper } from "@material-ui/core";
import {
  TableAtentions as TableAtentionsView,
  FilterTable as FilterTableView,
  ShowLote as ShowLoteView
} from "./components";
import { LoadingMessage } from 'components';


/*************REDUX*************/
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Atencion";
import { actionCreators as actionCreatorsAttention } from "../../store/Attention";
import { actionCreators as actionCreatorsUser } from "../../store/User";
/*************REDUX*************/

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: '3px'
  },
  content: {
    marginTop: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2, 0)
  },
  center: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));


const SendSampleLab = props => {
  const classes = useStyles();
  const history = useHistory()

  const { getUser,setAtencionesSinLote,getLoteReport,clearStateLote,getReporteLote } = props
  const { userCompany, atencion } = props
  const [filtro, setFiltro] = useState(null)
  useEffect(() => {

    if (!userCompany.isExistUser) {
      //Se guarda a nivel local el compania      
      const token = localStorage.getItem('token');
      if (!token)
        history.push('/login')
      else {
        const userLocal = localStorage.getItem('user');
        getUser({ usuario: userLocal })
      }
    }
  }, [userCompany.isExistUser, history, getUser])

  useEffect(() => {
    if (filtro && !atencion.atencionesSinLote && !atencion.loteGenerate) {
      setAtencionesSinLote(filtro)
    }
  }, [filtro, setAtencionesSinLote, atencion.atencionesSinLote])

  const handleReportelote =()=>{
    if(atencion.loteGenerate&&!atencion.loteGenerate.pdf){
      // Obtener el reporte
      getLoteReport(parseInt(atencion.loteGenerate.lote))
    }    
  }
  const handleFinalizar = ()=>{
    history.push('/envio-muestra')
    clearStateLote()
  }
  const handleViewlote= data=>{
    getReporteLote({
      lote:parseInt(data)
    })
    history.push('/seguimiento')
  }
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
            ENVÍO DE MUESTRAS
          </Typography>
        </Grid>
        <Grid item>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="textPrimary">
              Envío de Muestras
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
    {
      !atencion.loteGenerate
      ?
      <div className={classes.content}>
        {
          userCompany.isExistUser &&
          <FilterTableView
            onSave={setFiltro}
            filtro={filtro}
            isLoading={atencion.isLoading}
            companiaId={userCompany.compania}
          />
        }   
            <br/>     
            {
              atencion.atencionesSinLote&& !atencion.isLoading
              &&
              <Paper className={classes.paper}>
                <TableAtentionsView />
              </Paper>
            }
            {
              userCompany.isLoading &&<LoadingMessage message='Obteniendo datos, por favor, espere...'/> 
            }
      </div>
      :
      <div className={classes.content}>
        <Paper className={classes.paper}>
          <ShowLoteView data={atencion} onPreviewLote={handleReportelote} onFinalizar={handleFinalizar} onShowLote={handleViewlote} />
        </Paper>
      </div>
    }
    </div>
  );
};

const mapStateToProps = state => ({
  atencion: state.atencion,
  userCompany: state.userCompany,
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
      ...actionCreatorsUser,
      ...actionCreatorsAttention
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SendSampleLab)
