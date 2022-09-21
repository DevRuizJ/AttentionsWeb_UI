import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Divider,
  Typography,
  Button,
  Paper,
  Fab,
} from "@material-ui/core";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  center:{
    textAlign:"center"
  },
  button: {
    marginTop:theme.spacing(2),
    padding: theme.spacing(1),
    textAlign:"-webkit-center"
  },
  content:{
    paddingTop:theme.spacing(1)
  },
  gridCenter:{
    textAlign:"-webkit-center"
  },
  accountData:{
    padding:theme.spacing(3),
    marginTop:'40px'
  },
  accountDataIcon:{
    textAlign:"center",
    marginTop:'-50px',
    paddingBottom:theme.spacing(2)
  },
  boxAccounts:{
    margin:theme.spacing(2,0)
  },
  acoount:{
    margin:theme.spacing(1,0)
  },
  inline:{
    display:'flex',
    alignItems:'initial',
  }
}));


const PaymentDeposit = ({data,onConfirm,compania}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.accountData}>

        <div className={classes.accountDataIcon}>
          <Fab disabled aria-label="like">
            <AccountBalanceIcon color='primary' />
          </Fab>
        </div>
        <Typography
          color="textSecondary"
          variant="h4"
          className={classes.center}
        >
          CUENTAS DE SUIZA LAB
          </Typography>
        <div className={classes.boxAccounts}>
          {
            data.paymentAccount && data.paymentAccount.map((c, index) =>
              <Typography
                color="textSecondary"
                ariant="body1"
                key={index}
                className={classes.acoount}
              >
                <span><AccountBalanceIcon fontSize='small' /></span> <b>{c.descripcion}</b>: {c.numeroCuenta}
              </Typography>
            )
          }
        </div>
        <Divider />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              color="textSecondary"
              variant="h5"
              className={classes.mensaje}
            >
              Estimados {compania}
            </Typography>    
          </Grid>
          <Grid item xs={12}>
            <div className={classes.inline} >
              <DoubleArrowIcon /> 
              <Typography
                color="textSecondary"
                variant="body1"
                className={classes.mensaje}
              >
                Realize el deposito con su <b>código de referencia</b> en alguna de nuestra cuentas, con la <b>Referencia de Pago "{data.paymentData ? data.paymentData.serie + "-" + data.paymentData.numero : ""}"</b>
              </Typography>    
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.inline} >
              <DoubleArrowIcon /> 
              <Typography
                color="textSecondary"
                variant="body1"
                className={classes.mensaje}
              >
                Una vez realizado el pago, en el menu <b> {`Seguimimiento > Pagos`}</b>, ubique el documento <b>"{data.paymentData ? data.paymentData.serie + "-" + data.paymentData.numero : ""}"</b>, para registrar tu boleta de pago..
              </Typography>    
            </div>
          </Grid>
        </Grid>
      </Paper>

      <div className={classes.button} >
        <Button
          variant="contained"
          color="primary"
          type='button'
          onClick={() => onConfirm()}
        >
          Finalizar
        </Button>
      </div>
    </div>
  )
}



export default PaymentDeposit;

