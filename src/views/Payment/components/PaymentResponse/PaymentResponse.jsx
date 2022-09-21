
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link, useHistory,useParams } from 'react-router-dom'

/*************REDUX **********************/
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../../store/Payment";
import { actionCreators as actionCreatorsUser } from "../../../../store/User";
/*************REDUX **********************/

import { Breadcrumbs, Grid, Paper, Typography } from "@material-ui/core";
import {PaymentSuccess,PaymentRefused} from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: "3px",
  },
  title: {
    margin: theme.spacing(2, 0),
  },
  boxPagoResponse: {
    maxWidth:'300px'
  },
  paper: {
    padding: theme.spacing(2),
    display:'flex',
    justifyContent:'center'
  },
  formMessage:{
    [theme.breakpoints.up('sm')]:
    {
      width:'500px'
    },
    [theme.breakpoints.down('md')]:
    {
      width:'400px'
    },
    [theme.breakpoints.down('sm')]:
    {
      width:'100%'
    }
  },
  LoadingPay:{
    margin: theme.spacing(3),
  },
  LoadingPayImg:{
    textAlign:'center'
  }
}));

const PaymentResponse = ({ getUser, userCompany, payment,getPaymentReport,clearStateFacturacion }) => {
  const classes = useStyles();
  const history = useHistory()
  let { status, comprobante } = useParams();

  const [statusPay] = React.useState(status)
  const [comprobantePay, setComprobantePay] = React.useState(null)

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
    if (status==='success') {
      //Se guarda a nivel local el compania      
      const dataComprobante = comprobante.split("_")
      setComprobantePay(
        {
          "Tipo":dataComprobante[0],
          "Serie":dataComprobante[1],
          "Numero":dataComprobante[2],
          "Empresa":"01"
      }
      )
    }

  }, [comprobante,status])

  useEffect(() => {
    if (comprobantePay) {
      //Se guarda a nivel local el compania      
      getPaymentReport(comprobantePay)
    }

  }, [comprobantePay,getPaymentReport])  
  
  const handleFinalizar = ()=>{
    history.push('/Pago')
    clearStateFacturacion()
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
            FACTURACIÓN {payment.payload}
          </Typography>
        </Grid>
        <Grid item>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              to="/pago"
            //onClick={e => clearPatient()}
            >
              Pago
                </Link>
            <Typography
              color="textPrimary"
            >
              Cancelación
              </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <div className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs >
            {
              !userCompany.isExistUser
                ? <div className={classes.LoadingPay}>
                    <div className={classes.LoadingPayImg}>
                      <img src="/images/gif-maker.gif" alt="Gif de pago"/>
                    </div>
                  </div>
                : <Paper className={classes.paper}>
                    <div className={classes.formMessage}>
                    {
                      statusPay === 'success'
                        ? <PaymentSuccess data={payment} dataCompania={userCompany} onFinalizar={handleFinalizar}/>
                        : <PaymentRefused data={payment} dataCompania={userCompany} onFinalizar={handleFinalizar}/>
                    }
                    </div>
                </Paper>
            }
          </Grid>
        </Grid>
      </div>

    </div>
  )
}

const mapStateToProps = state => ({
  payment: state.payment,
  userCompany: state.userCompany,
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
      ...actionCreatorsUser
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentResponse)

