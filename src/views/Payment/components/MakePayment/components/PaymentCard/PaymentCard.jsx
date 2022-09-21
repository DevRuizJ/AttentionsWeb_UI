import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import KRGlue from "@lyracom/embedded-form-glue";

import clsx from 'clsx';

import {
  Grid,
  Typography,
  IconButton
} from '@material-ui/core'
import { LoadingMessage } from 'components';
import ReplayIcon from '@material-ui/icons/Replay';

/*************REDUX **********************/
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../../../../store/Payment";
import { useState } from 'react';
/*************REDUX *********************/

const useStyles = makeStyles((theme) => ({
  root:{   
    width:'100%',
    padding:theme.spacing(1)
  },
  container:{
    backgroundColor: theme.palette.background.default, 
    paddingTop:theme.spacing(1),
    paddingLeft:theme.spacing(1),
    textAlign:'center'
  },
  formPagoHidden:{
    display:'none'
  },
  formPago:{    
    background: '#fff',
    boxShadow: '0 6px 12px 0 rgba(90, 116, 148, 0.4)',
    borderRadius: '10px',
    maxWidth:'348px',
    overflow:'hidden',    
    marginBottom: theme.spacing(2),
  },
  izypay:{
    padding: "20px 40px 0px 40px"
  },
  headerForm:{
    width: '100%',
    '& img':{
      width:'100%'
    }
  },
  footerForm:{
    textAlign:"right",
    marginBottom:'-5px',
    marginTop:'-5px',
    '& img':{
      heigth:'70px'
    }
  },
  message:{
    margin:theme.spacing(2),
  }
}));

const PaymentCard = ({userCompany,payment,getFormPago}) => {
  const classes = useStyles();
  const [promiseError,setPromiseError] = useState(null)
  const [isLoadingForm,setLoadingForm] = useState(true)

  React.useEffect(() => {
    const {isExistUser,compania } = userCompany
    const data = payment.paymentData
    if (data&&isExistUser)
    {
      getFormPago({
        "tipo": data.tipo,
        "serie": data.serie,
        "numero": data.numero,
        "compania":compania

      })
    }
}, [payment.paymentData,getFormPago,userCompany.isExistUser])


React.useEffect(()=>{
  if(payment.PayForm){
    const endpoint = "https://api.lyra.com";
    const publicKey = payment.PayForm.publicKey
    const formToken = payment.PayForm.formToken;
    const parmsPay = payment.PayForm.params
    //const parmsPay = "https://localhost:5001/api/pago/registro-pago-doc?documento=01_SP1_0000014&status="
    
    KRGlue.loadLibrary(endpoint, publicKey) /* Load the remote library */
      .then(({ KR }) =>
        KR.setFormConfig({
          /* set the minimal configuration */
          formToken: formToken,
          "kr-post-url-success":`${parmsPay}success`,
          "kr-post-url-refused":`${parmsPay}refused`,
          "kr-hide-debug-toolbar":'true',
          "kr-language": "es-ES" /* to update initialization parameter */
        })
      )
      .then(({ KR }) =>
        KR.addForm("#myPaymentForm")        
      ) /* add a payment form  to myPaymentForm div*/
      .then(({ KR, result }) =>{
        KR.showForm(result.formId) /* 
        KR.onFormReady( function() {
          document.querySelector('.kr-section-row').style.display='none';          
          document.querySelector('#krtoolbar').style.backgroundColor = 'rgba(255, 255, 255, 0)';
        })*/
      }) /* show the payment form */
      .catch(error =>
        setPromiseError(error + " (see console for more details)")   
          
      ).finally(()=>{
        
        setLoadingForm(false)
      })
  }
},[payment.PayForm])

  return (
<div className={classes.root}>
      <div className={classes.container}>
        { isLoadingForm && <LoadingMessage message="Obteniendo formulario de pago..." /> }   
        <div className={clsx({
          [classes.formPagoHidden]:isLoadingForm
        })}>            
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <div className={classes.formPago}>
                  <div className={classes.headerForm}>
                    <img src='images\metodos_pago\header-izypay.jpg' alt='Tarjeta Visa'/>                
                  </div> 
                <div className={classes.izypay}>
                  <div id="myPaymentForm" />
                  <div>{promiseError||null}</div>
                </div>
                <div className={classes.footerForm}>
                  <img src='images\metodos_pago\footer-izipay.png' alt='Tarjeta Visa'/>                
                </div>
                <div className={classes.message}>
                  <Typography variant='caption' component='h5' color='secondary'>
                    En caso que hay error con el formulario de pago, vuelva a cargar la pagina.
                  </Typography>  
                  <IconButton 
                    aria-label="reload" 
                    color="secondary"
                    //onClick={()=>RecargarPagina()}
                  >
                    <ReplayIcon />
                  </IconButton>
                </div>
              </div>

            </Grid>
          </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  userCompany: state.userCompany,
  payment: state.payment,
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentCard)
