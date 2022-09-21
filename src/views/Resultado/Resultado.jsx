import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Breadcrumbs,
  CircularProgress,
} from '@material-ui/core';

import { ResultadoDetalle, ResultadoPdf, DialogPDF } from './components';

import { Link, useHistory } from 'react-router-dom';
/*************REDUX *************/

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Resultado";

/*************REDUX *************/
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: '3px'
  },
  title: {
    margin: theme.spacing(2, 0)
  },
  center: {
    textAlign: 'center'
  },
  inline: {
    display: 'inline-flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginTop: 'auto',
    }
  },
}));

const Resultado = ({ getResultadoPaciente,sendResultPac, resultadoStore, }) => {
  const classes = useStyles();
  const history = useHistory()
  const { isSelectResultado, selectResultado,isLoadPdfResult, resultadoPacientePdf } = resultadoStore
  //const [openDialogPdf, setOpenDialogPdf] = useState(false)
  useEffect(() => {
    if (isSelectResultado) {
      const { idOrden, periodo, anio, sucursal, empresa } = selectResultado
      const dataRequest = { idOrden, periodo, anio, sucursal, empresa }

      getResultadoPaciente(dataRequest)
    }
    else
      history.push("/resultados");

  }, [getResultadoPaciente,history,isSelectResultado,selectResultado])

  const handleSendResultado = data=>
  {
    
    const { idOrden, periodo, anio, sucursal, empresa } = selectResultado
    const dataRequest = { idOrden, periodo, anio, sucursal, empresa,...data }
    sendResultPac(dataRequest)
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
          <Typography
            variant='h4'
            component='h4'
            className={classes.title}
          >
            RESULTADO DEL PACIENTE
          </Typography>
        </Grid>
        <Grid item>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              to="/resultados"
            >
              Lista Resultados
            </Link>
            <Typography
              color="textPrimary"
            >
              Resultado
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      {
        resultadoStore.resultadoPaciente
          ?
          <Grid
            container
            spacing={2}
          >
            <Grid
              item lg={4} md={6} xl={4} xs={12}
            >
              <ResultadoDetalle
                data={resultadoStore.resultadoPaciente}
              />
              { isLoadPdfResult&&<DialogPDF data={resultadoStore} onSave={handleSendResultado}/>}
              
            </Grid>
            <Grid
              item lg={8} md={6} xl={8} xs={12}
            >
              {
                isLoadPdfResult
                  ?
                  <ResultadoPdf pdfResult={resultadoPacientePdf}
                  />
                  :
                  <div className={classes.center}>
                    <CircularProgress color="secondary" />
                    <Typography variant='subtitle2' component='p' color='secondary' className={classes.center}>
                      Por favor, espere, estamos obteniendo el resultado pdf...
                </Typography>

                  </div>

              }
            </Grid>
          </Grid>
          :
            
            <Typography variant='subtitle2' component='p' color='secondary' className={classes.center}>
              Lo sentimos estamos teniendo inconvenientes con el servidor, intentelo mas tarde. :(
          </Typography>
      }
    </div>
  );
}


const mapStateToProps = state => ({
  resultadoStore: state.resultado,
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Resultado)
